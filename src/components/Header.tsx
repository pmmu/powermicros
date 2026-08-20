import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/custom-grow", label: "Custom Grow" },
  { href: "/farm-story", label: "Farm Story" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand-link" aria-label="PowerMicros home">
          <Image
            src="/brand/powermicros-logo.png"
            alt="PowerMicros"
            width={220}
            height={76}
            priority
            className="brand-logo"
          />
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-primary header-cta" href="/shop">
          Order a sampler
        </Link>
      </div>
    </header>
  );
}
