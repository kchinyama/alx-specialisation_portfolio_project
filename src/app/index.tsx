// src/app/index.tsx
import Link from 'next/link';

export default function HomePage() {
    return (
        <div>
            <h1>Welcome to the Admin Portal</h1>
            <Link href="/login">Go to Login</Link>
        </div>
    );
}
