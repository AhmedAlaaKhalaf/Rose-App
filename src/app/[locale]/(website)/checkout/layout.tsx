export default function CheckoutLayout({
  children,
  summary,
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
}) {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 container">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
        <div className="w-full lg:w-[60%]">{children}</div>
        <div className="w-full lg:w-[40%]">{summary}</div>
      </div>
    </div>
  );
}
