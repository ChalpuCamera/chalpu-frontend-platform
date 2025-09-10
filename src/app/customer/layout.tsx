"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Search,
  MessageSquare, 
  Gift,
  User 
} from "lucide-react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { path: "/customer", icon: Home, label: "홈" },
    { path: "/customer/menu", icon: Search, label: "탐색" },
    { path: "/customer/history", icon: MessageSquare, label: "내역" },
    { path: "/customer/rewards", icon: Gift, label: "리워드" },
    { path: "/customer/mypage", icon: User, label: "마이" }
  ];

  return (
    <div className="min-h-screen pb-16">
      {children}
      
      {/* 하단 네비게이션 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path || 
                           (item.path !== "/customer" && pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-auto py-2 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => router.push(item.path)}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}