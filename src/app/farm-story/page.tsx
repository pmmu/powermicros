import Image from "next/image";

export default function FarmStoryPage() {
  return (
    <>
      <section className="page-intro story-intro">
        <div className="container page-intro-grid">
          <div>
            <p className="eyebrow">Clark Dubignon Farms</p>
            <h1>PowerMicros is our farm-to-home microgreens brand.</h1>
            <p>
              A practical small-farm system built from real crop tests, local demand, and a grow-to-order rhythm.
            </p>
          </div>
          <Image src="/farm/farm-rainbow.jpg" alt="Rainbow over Clark Dubignon Farms" width={1600} height={1200} sizes="(max-width: 900px) 100vw, 38vw" className="page-intro-image" />
        </div>
      </section>
      <section className="section section-tight">
        <div className="container story-grid">
          <Image src="/farm/farm-container.jpg" alt="Shipping container grow space at the farm" width={1600} height={1000} sizes="(max-width: 900px) 100vw, 48vw" className="story-image" />
          <div className="story-copy">
            <p>
              PowerMicros is a Clark Dubignon Farms company. We are a first-generation farm starting fresh and building a sustainable operation from crop tests, local customers, and practical weekly demand.
            </p>
            <p>
              Our microgreens grow inside an outfitted shipping container. We also raise laying chickens and grow lavender, peppers, blackberries, okra, tomatoes, and seasonal crops that can become farm add-ons when supply allows.
            </p>
            <p>
              Our goal is direct: grow excellent food, reduce waste, and build a small farm operation that can make money and keep improving.
            </p>
            <div className="callout-panel">
              <h2>Launching local-first</h2>
              <p>Pickup and local delivery let us protect freshness while we test packaging for shipping delicate crops.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
