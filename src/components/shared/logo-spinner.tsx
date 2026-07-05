"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/tailwind-merge";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type LogoSpinnerProps = {
  className?: string;
  size?: number;
  fullScreen?: boolean;
};

const FULLSCREEN_OVERLAY_CLASS =
  "fixed inset-0 z-[9999] flex justify-center items-center bg-white dark:bg-zinc-950 w-[100dvw] h-[100dvh] min-h-[100dvh]";

export default function LogoSpinner({
  className,
  size = 80,
  fullScreen = false,
}: LogoSpinnerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!fullScreen || !mounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [fullScreen, mounted]);

  const spinner = (
    <Image
      src="/assets/logo.png"
      alt=""
      width={size}
      height={size}
      className="animate-logo-pulse"
      priority
    />
  );

  if (!fullScreen) {
    return (
      <div
        className={cn("flex justify-center items-center", className)}
        role="status"
        aria-label="Loading"
      >
        {spinner}
      </div>
    );
  }

  const overlay = (
    <div className={cn(FULLSCREEN_OVERLAY_CLASS, className)} role="status" aria-label="Loading">
      {spinner}
    </div>
  );

  if (mounted) {
    return createPortal(overlay, document.body);
  }

  return overlay;
}
