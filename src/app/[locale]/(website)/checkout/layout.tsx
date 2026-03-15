export default function CheckoutLayout({ children, summary }: { children: React.ReactNode, summary: React.ReactNode }) {
    return <div className="container mx-auto flex gap-10 py-16">
        <div className="w-[60%]">
            {children}
        </div>
        <div className="w-[40%]">
            {summary}
        </div>
    </div>
}