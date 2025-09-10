"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Store,
  Menu as MenuIcon, 
  MessageSquare, 
  BarChart3, 
  Settings 
} from "lucide-react";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { path: "/owner", icon: Home, label: "홈" },
    { path: "/owner/store", icon: Store, label: "가게" },
    { path: "/owner/menu", icon: MenuIcon, label: "메뉴" },
    { path: "/owner/feedbacks", icon: MessageSquare, label: "피드백" },
    { path: "/owner/mypage", icon: Settings, label: "설정" }
  ];

  return (
    <div className="min-h-screen pb-16">
      {children}
      
      {/* 하단 네비게이션 바 */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path || 
                           (item.path !== "/owner" && pathname.startsWith(item.path));
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