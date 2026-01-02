import Link from "next/link";

export default function NotFound() {
    return (
        <div className="page-container">
            <h1>Page Not Found 🤨</h1>
            
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link href="/">
                <button>Home</button>
            </Link>
        </div>
    );
}