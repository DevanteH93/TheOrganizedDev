import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="page-container">
            <h1 className="text-large">Thank you for your purchase 🎉</h1>            
            <Link href="/">
                <button>Continue &rarr;</button>
            </Link>
        </div>
    );
}