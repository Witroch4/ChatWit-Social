// app/api/instagram/status/route.ts
import { getServerSession } from "next-auth/react"; // Atualize a importação
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ connected: false }), { status: 200 });
  }

  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      provider: "instagram",
      NOT: { access_token: null },
    },
  });

  return new Response(JSON.stringify({ connected: Boolean(account) }), { status: 200 });
}
