import { User } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function LoginIcon() {
  return (
    <Link
      href="/login"
      className="flex items-center gap-2 cursor-pointer text-zinc-700 dark:text-zinc-50 p-4"
    >
      <User className="w-5 h-5" />
      Login
    </Link>
  );
}
