"use client";

import { Button } from "@/components/ui/button";
import type { User } from "next-auth";
import Link from "next/link";
import { CircleUser, LogOut } from "lucide-react";
import { LineMdCogLoop } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

type Props = {
  user?: User;
};

const LoginBadge = ({ user }: Props) => {
  if (!user) {
    // Caso não haja usuário logado, exibe botão para entrar
    return (
      <div className="flex flex-col gap-2 p-2">
        <LoginButton>
          <Button variant="default">Entrar</Button>
        </LoginButton>
      </div>
    );
  }

  // Usuário logado: mostra avatar, nome e opções sem dropdown
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user.image || ""} />
          <AvatarFallback className="bg-green-500">
            <CircleUser className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
        <span className="font-medium text-foreground">{user.name ?? "Minha Conta"}</span>
      </div>
      <hr className="w-full border-muted-foreground/20" />
      <div className="flex flex-col gap-1 w-full text-sm">
        <Link href="/auth/settings" className="hover:underline flex items-center gap-2">
          <LineMdCogLoop className="mr-2" />
          Perfil
        </Link>
        <Link href="/cobranca" className="hover:underline">
          Cobrança
        </Link>
        <LogoutButton>
          <Button variant="ghost" className="flex items-center gap-2 justify-start text-sm">
            <LogOut /> Sair
          </Button>
        </LogoutButton>
      </div>
    </div>
  );
};

export default LoginBadge;
