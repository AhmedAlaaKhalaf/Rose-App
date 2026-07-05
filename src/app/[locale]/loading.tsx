import LogoSpinner from "@/components/shared/logo-spinner";

export default function LocaleLoading() {
  return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <LogoSpinner size={96} />
    </div>
  );
}
