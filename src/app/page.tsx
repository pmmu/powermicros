import Image from "next/image";
import Link from "next/link";
import { PeppersCard } from "@/components/PeppersCard";
import { ProductCard } from "@/components/ProductCard";
import { ServiceAreaNotice } from "@/components/ServiceAreaNotice";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { microgreenProductIds } from "@/lib/microgreenVarieties";
import { listPublicProducts } from "@/lib/products/repository";

type ImagePromoCard = {
  kind: "image";
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
};

type ProofPromoCard = {
  kind: "proof";
  eyebrow: string;
  title: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
};

type PromoCard = ImagePromoCard | ProofPromoCard;

const promoCards: PromoCard[] = [
  {
    kind: "image",
    eyebrow: "Start here",
    title: "Order a Sampler",
    image: "/farm/microgreens-round-leaf.jpg",
    imageAlt: "Round-leaf microgreens filling a tray",
    href: "/shop",
    cta: "Shop Now",
  },
  {
    kind: "proof",
    eyebrow: "Why we're different",
    title: "Harvested Close to Pickup",
    image: "/farm/microgreens-shelf-row.jpg",
    imageAlt: "Microgreens trays growing in a row under lights",
    href: "/farm-story",
    cta: "Learn More",
  },
  {
    kind: "proof",
    eyebrow: "Subscriber first",
    title: "Grown Around Demand",
    image: "/farm/microgreens-amaranth.jpg",
    imageAlt: "Bright pink amaranth microgreens growing in soil",
    href: "/subscribe",
    cta: "Learn More",
  },
  {
    kind: "proof",
    eyebrow: "Add-ons",
    title: "Fresh This Week",
    image: "/farm/farm-peppers.jpg",
    imageAlt: "Fresh colorful peppers on a table",
    href: "/shop",
    cta: "Shop Add-ons",
  },
  {
    kind: "image",
    eyebrow: "Weekly tray program",
    title: "Weekly Tray Program",
    image: "/farm/microgreens-grow-rack.jpg",
    imageAlt: "Microgreens trays growing on a rack under lights",
    href: "/subscribe",
    cta: "How subscriptions work",
  },
];

export default async function Home() {
  const subscriptionPlans = await listPublicProducts("SUBSCRIPTION");
  const oneTimeProducts = await listPublicProducts("ONE_TIME");
  const microgreenProducts = oneTimeProducts.filter((product) => product.id === "microgreens-sampler" || microgreenProductIds.includes(product.id));
  const peppers = oneTimeProducts.find((product) => product.id === "peppers");
  const addOnProducts = oneTimeProducts.filter((product) => product.id !== "microgreens-sampler" && !microgreenProductIds.includes(product.id) && product.id !== "peppers");

  return (
    <>
      <section className="section section-tight conversion-section homepage-shop-section">
        <div className="container">
          <h1 className="sr-only">PowerMicros fresh microgreens, weekly boxes, and one-time add-ons</h1>
          <ServiceAreaNotice />
          <div className="promo-grid">
            {promoCards.map((card) => (
              <article className={`promo-card promo-card-${card.kind === "image" ? "large" : "proof"}`} key={card.title}>
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  width={1200}
                  height={900}
                  sizes={card.kind === "image" ? "(max-width: 900px) 100vw, 42vw" : "(max-width: 900px) 100vw, 25vw"}
                  className="promo-card-image"
                />
                <div className="promo-card-body">
                  <p className="eyebrow">{card.eyebrow}</p>
                  <h3>{card.title}</h3>
                  <Link className="btn btn-primary" href={card.href}>{card.cta}</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tight single-order-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Microgreens trays</p>
              <h2 className="section-title">Choose the tray you want.</h2>
            </div>
            <Link className="btn btn-secondary" href="/shop">View all shop items</Link>
          </div>
          <div className="grid grid-3">
            {microgreenProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tight market-floor">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Seasonal add-ons</p>
              <h2 className="section-title">Fresh extras when the farm has them.</h2>
            </div>
            <Link className="btn btn-secondary" href="/shop">Shop add-ons</Link>
          </div>
          <div className="grid grid-3">
            {peppers ? <PeppersCard product={peppers} /> : null}
            {addOnProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tight products-now-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Weekly tray program</p>
              <h2 className="section-title">Subscriptions for steady microgreens demand.</h2>
            </div>
            <Link className="btn btn-secondary" href="/subscribe">See how subscriptions work</Link>
          </div>
          <div className="grid grid-3">
            {subscriptionPlans.map((plan) => (
              <SubscriptionCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tight custom-grow-teaser">
        <div className="container custom-grow-teaser-inner">
          <div>
            <p className="eyebrow">Custom grow requests</p>
            <h2 className="section-title">Plan what you want us to grow next.</h2>
            <p className="section-copy">
              Pick open grow slots, choose microgreens or seasonal crops, and send us a request before we plant.
            </p>
          </div>
          <Link className="btn btn-primary" href="/custom-grow">Open grow planner</Link>
        </div>
      </section>
      <section className="story-band micro-band">
        <Image src="/farm/microgreens-hero-sharp.jpg" alt="Fresh microgreens growing densely in a tray" fill sizes="100vw" className="story-band-image" />
        <div className="story-band-overlay micro-band-overlay" />
        <div className="container story-band-content">
          <p className="eyebrow eyebrow-light">Grown by Clark Dubignon Farms</p>
          <h2>Local farm-grown greens, without making the farm the whole story.</h2>
          <p>
            PowerMicros is the microgreens brand. The farm story still matters, but this site is here to help people buy fresh greens first.
          </p>
          <Link className="btn btn-primary btn-light" href="/farm-story">Read the farm story</Link>
        </div>
      </section>
    </>
  );
}
