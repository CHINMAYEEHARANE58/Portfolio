import Link from "next/link";
export default function NotFound() { return <section className="not-found container"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>This route took a <em>detour.</em></h1><p>The page you&apos;re looking for isn&apos;t here. Head back to the portfolio.</p><Link href="/" className="button button-primary">Back to home ↗</Link></section>; }
