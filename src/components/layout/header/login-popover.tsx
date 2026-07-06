"use client";

import { useState, useRef } from "react";
import { User } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link } from "@/i18n/navigation";
import LoginPopoverContent from "./login-popover-content";

export default function LoginPopover() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // relatedTarget can be null or a non-Node (e.g. window) when leaving the page
    const relatedTarget = e.relatedTarget instanceof Node ? e.relatedTarget : null;

    // Check if mouse is moving to an element inside the popover
    if (relatedTarget && containerRef.current && containerRef.current.contains(relatedTarget)) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <div ref={containerRef} onMouseLeave={handleMouseLeave}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Link
            href="/login"
            onMouseEnter={handleMouseEnter}
            className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-50 p-4"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          onMouseEnter={handleMouseEnter}
          className="w-[393px] bg-white dark:bg-zinc-800 border-none shadow-lg rounded-2xl p-0 overflow-hidden"
        >
          <LoginPopoverContent activeTab={activeTab} setActiveTab={setActiveTab} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
