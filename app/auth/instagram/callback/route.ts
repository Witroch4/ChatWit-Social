// app/auth/instagram/callback/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Ajuste o caminho conforme sua configuração do NextAuth
import { prisma } from "@/lib/db"; // Ajuste conforme sua configuração do prisma

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new NextResponse('Código não fornecido', { status: 400 });
  }

  const clientId = process.env.INSTAGRAM_CLIENT_ID!;
  const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET!;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI!;

  // 1. Trocar code por token de curto prazo
  const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
      code,
    })
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error('Erro ao obter token curto prazo:', errorText);
    return new NextResponse('Erro ao obter token curto prazo', { status: 500 });
  }

  const tokenData = await tokenResponse.json() as {
    access_token: string;
    user_id: string;
    permissions: string[];
  };

  const shortLivedToken = tokenData.access_token;

  // 2. Trocar o token curto por um de longo prazo (60 dias)
  const longTokenResponse = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${clientSecret}&access_token=${shortLivedToken}`);
  if (!longTokenResponse.ok) {
    const errorText = await longTokenResponse.text();
    console.error('Erro ao obter token longo prazo:', errorText);
    return new NextResponse('Erro ao obter token longo prazo', { status: 500 });
  }

  const longTokenData = await longTokenResponse.json() as {
    access_token: string;
    token_type: string;
    expires_in: number; // em segundos
  };

  const finalToken = longTokenData.access_token;
  const expiresInSeconds = longTokenData.expires_in;
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
  // Converte a validade em um timestamp UNIX para armazenar em "expires_at" do Account.

  // 3. Obter a sessão do usuário logado
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    // Se não tiver sessão, redirecionar ou falhar
    return new NextResponse('Usuário não autenticado na plataforma', { status: 401 });
  }

  const userId = session.user.id;

  // 4. Armazenar o token do Instagram no banco:
  // Precisamos criar ou atualizar uma Account para o provider "instagram"
  const provider = "instagram";
  const providerAccountId = tokenData.user_id;

  // Se já existe uma conta instagram para esse userId, atualiza, senão cria.
  await prisma.account.upsert({
    where: {
      provider_providerAccountId: {
        provider: provider,
        providerAccountId: providerAccountId,
      }
    },
    update: {
      access_token: finalToken,
      expires_at: expiresAt,
      token_type: longTokenData.token_type,
      scope: "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish"
    },
    create: {
      userId: userId,
      type: "oauth",
      provider: provider,
      providerAccountId: providerAccountId,
      access_token: finalToken,
      expires_at: expiresAt,
      token_type: longTokenData.token_type,
      scope: "instagram_business_basic,instagram_business_manage_messages,instagram_business_manage_comments,instagram_business_content_publish"
    }
  });

  // Redireciona o usuário de volta ao dashboard
  return NextResponse.redirect('/dashboard');
}
