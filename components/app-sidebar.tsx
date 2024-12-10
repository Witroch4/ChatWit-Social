"use client"

import { useSession } from "next-auth/react"
import LoginBadge from "@/components/auth/login-badge"
import { ChevronDown, CircleUser, User2, Instagram } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"


export function AppSidebar() {
  const { data: session } = useSession()

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <SidebarContent>
        {/* Grupo: Social Login */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center gap-2">
                Social Login
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <div className="p-4">
                  <h1 className="text-xl font-bold mb-4">
                    Faça login e dê Autorização da sua Rede Social
                  </h1>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="/auth/instagram">
                          <Instagram className="mr-2" />
                          <span>Login com Instagram</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </div>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Grupo: Contatos */}
        <Collapsible defaultOpen={false} className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex items-center gap-2">
                Contatos
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <div className="p-4 text-sm space-y-2">
                  <h2 className="font-bold mb-2 text-base">Contatos</h2>
                  <p>Criar Novo Contato</p>
                  <p>Importar</p>
                  <p>SegmentosPRO</p>
                  <p>Aplicar filtro(s) aos seus contatos para criar o seu primeiro Segmento</p>
                  <p>Widgets</p>
                  <p>Contatos</p>
                  <p>Post or Reel Comments #1</p>
                  <p>0</p>
                  <p>Filtro</p>
                  <p>Pesquisar</p>
                  <p>0 selecionado(s) do total de 2</p>
                  <p>Ações em Lote</p>
                  <table className="mt-4 w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2">Imagem do Perfil</th>
                        <th>Nome</th>
                        <th>Gênero</th>
                        <th>Status</th>
                        <th>Inscrito</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td>arma.dillo1817</td>
                        <td>Inscrito</td>
                        <td>-</td>
                        <td>Inscrito</td>
                        <td>há 5 horas</td>
                      </tr>
                      <tr>
                        <td>João Sousa Miguel</td>
                        <td>Inscrito</td>
                        <td>-</td>
                        <td>Inscrito</td>
                        <td>há 5 horas</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Grupo: Agendamento de Postagens */}
        <SidebarGroup>
          <SidebarGroupLabel>Agendamento de Postagens</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/agendamento">Agendar Novo Post</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grupo: Calendário */}
        <SidebarGroup>
          <SidebarGroupLabel>Calendário</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/calendario">Visualizar Calendário</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grupo: Automação */}
        <SidebarGroup>
          <SidebarGroupLabel>Automação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/automacao">Configurações de Automação</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grupo: Chat ao Vivo */}
        <SidebarGroup>
          <SidebarGroupLabel>Chat ao Vivo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/chat">Acessar Chat</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* O grupo "Meu Perfil" foi removido daqui */}

        {/* Grupo: Ajuda (Docs) */}
        <SidebarGroup>
          <SidebarGroupLabel>Ajuda (Docs)</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/docs">Documentação</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* SidebarFooter: Minha Conta com Dropdown (incluindo LoginBadge, ThemeToggle, Perfil, Cobrança, Sair) */}
      <SidebarFooter>
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center w-full px-2 py-1 hover:bg-accent rounded">
                {session?.user?.image ? (
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarImage src={session.user.image} />
                    <AvatarFallback>
                      <CircleUser className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <User2 className="mr-2" />
                )}
                <span>{session?.user?.name ?? "Minha Conta"}</span>
                <ChevronDown className="ml-auto" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              {/* Aqui mostra o LoginBadge já expandido */}
              <LoginBadge user={session?.user} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
