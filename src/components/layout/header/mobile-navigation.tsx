"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import LoginIcon from "./login-icon";
import { Sheet, SheetContent, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import HeaderNavigation from "./header-navigation";
import { Menu } from "lucide-react";
import { usePathname } from "@/i18n/navigation";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="sm:hidden h-auto">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col justify-between">
        <HeaderNavigation onNavigate={() => setOpen(false)} />
        <SheetFooter>
          <LoginIcon />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
