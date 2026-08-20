import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="hero-shell micro-hero">
      <Image
        src="/farm/microgreens-hero-sharp.jpg"
        alt="Fresh PowerMicros microgreens ready for harvest"
        fill
        priority
        sizes="100vw"
        className="hero-image"
      />
      <div className="hero-overlay micro-overlay" />
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">Fresh local microgreens</p>
          <h1>Premium microgreens grown for your weekly table.</h1>
          <p>
            Small-batch greens harvested on a local schedule, packed fresh, and made easy through weekly subscriptions and market-style add-ons.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary btn-light" href="/subscribe">
              Start a weekly box
            </Link>
            <Link className="btn btn-secondary btn-on-dark" href="/shop">
              Shop this week
            </Link>
          </div>
        </div>
        <div className="hero-panel market-panel" aria-label="PowerMicros market promise">
          <p className="eyebrow eyebrow-light">Market fresh</p>
          <ol>
            <li><strong>Harvested close to pickup</strong><span>Greens stay crisp because we grow around real weekly demand.</span></li>
            <li><strong>Subscriber-first batches</strong><span>Your weekly box gets priority before extra trays hit the shop.</span></li>
            <li><strong>Hometown counter feel</strong><span>Fresh food, simple ordering, and local pickup without the grocery-store guesswork.</span></li>
          </ol>
        </div>
      </div>
    </section>
  );
}
