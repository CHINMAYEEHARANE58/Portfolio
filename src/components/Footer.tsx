import Link from "next/link";
import { profile } from "@/content/profile";
export function Footer() {
  return <footer className="footer"><div className="container footer-inner"><div><Link href="/" className="footer-mark">CH<span className="accent">.</span></Link><p>Building thoughtful software, one problem at a time.</p></div><div className="footer-links"><Link href="/projects">Projects</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><a href={profile.social.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href={profile.social.portfolioSource} target="_blank" rel="noopener noreferrer">This site&apos;s code ↗</a><a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Chinmayee Harane</span><span>Designed & built with care · Pune, India</span></div></footer>;
}
