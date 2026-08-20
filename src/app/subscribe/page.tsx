import Image from "next/image";
import { ServiceAreaNotice } from "@/components/ServiceAreaNotice";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { listPublicProducts } from "@/lib/products/repository";

export const dynamic = "force-dynamic";

export default async function SubscribePage() {
  const subscriptionPlans = await listPublicProducts("SUBSCRIPTION");

  return (
    <>
      <section className="page-intro market-intro">
        <div className="container page-intro-grid">
          <div>
            <p className="eyebrow">Weekly tray program</p>
            <h1>Set up a steady number of trays per week.</h1>
            <p>
              Subscriptions are built around tray counts. Choose how many trays you want each week, and larger recurring orders earn better pricing on add-ons and one-time tray orders.
            </p>
            <ServiceAreaNotice />
          </div>
          <Image src="/farm/microgreens-grow-rack.jpg" alt="Microgreens trays growing on a rack under lights" width={1200} height={900} sizes="(max-width: 900px) 100vw, 38vw" className="page-intro-image" />
        </div>
      </section>
      <section className="section section-tight">
        <div className="container grid grid-3">
          {[
            ["Pick a tray count", "Start with the number of trays you know you can use. We can adjust as demand changes."],
            ["Choose your varieties", "Sampler and one-time tray orders help you learn your favorites before setting a recurring grow schedule."],
            ["Unlock better add-on pricing", "The more trays you reserve each week, the better your discounts on farm extras and one-time orders."],
          ].map(([title, body]) => (
            <article className="card shelf-card" key={title}>
              <p className="eyebrow">How it works</p>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-tight market-floor">
        <div className="container grid grid-3">
          {subscriptionPlans.map((plan) => (
            <SubscriptionCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>
    </>
  );
}
