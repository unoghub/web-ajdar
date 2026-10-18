import Link from "next/link";
import { LayoutDashboard, Newspaper, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return;

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center">
        <Image
          src="/assets/logo.svg"
          width={75}
          height={50}
          alt="unoglogo"
          className="shrink-0 select-none"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/dashboard" />}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/dashboard/news" />}>
                  <Newspaper />
                  <span>Bülten</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Avatar>
                <AvatarImage src={session.user.image || ""} />
                <AvatarFallback>{session.user.name[0]}</AvatarFallback>
              </Avatar>
              {session.user.name}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
