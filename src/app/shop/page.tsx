import Image from "next/image";
import { PeppersCard } from "@/components/PeppersCard";
import { ProductCard } from "@/components/ProductCard";
import { ServiceAreaNotice } from "@/components/ServiceAreaNotice";
import { microgreenProductIds } from "@/lib/microgreenVarieties";
import { listPublicProducts } from "@/lib/products/repository";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await listPublicProducts("ONE_TIME");
  const microgreenProducts = products.filter((product) => product.id === "microgreens-sampler" || microgreenProductIds.includes(product.id));
  const peppers = products.find((product) => product.id === "peppers");
  const addOnProducts = products.filter((product) => product.id !== "microgreens-sampler" && !microgreenProductIds.includes(product.id) && product.id !== "peppers");

  return (
    <>
      <section className="page-intro market-intro">
        <div className="container page-intro-grid">
          <div>
            <p className="eyebrow">Market add-ons</p>
            <h1>Microgreens first, seasonal extras when available.</h1>
            <p>
              Shop one-time greens and limited add-ons for pickup or local delivery. The main shelf is microgreens; farm extras show up when they are fresh and ready.
            </p>
            <ServiceAreaNotice />
          </div>
          <Image src="/farm/microgreens-tray.jpg" alt="Fresh microgreens tray ready for harvest" width={1200} height={900} sizes="(max-width: 900px) 100vw, 38vw" className="page-intro-image" />
        </div>
      </section>
      <section className="section section-tight market-floor">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Microgreens trays</p>
              <h2 className="section-title">Pick the tray you want us to grow.</h2>
            </div>
          </div>
          <div className="grid grid-3">
            {microgreenProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="section section-tight single-order-section">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Seasonal add-ons</p>
              <h2 className="section-title">Fresh extras when the farm has them.</h2>
            </div>
          </div>
          <div className="grid grid-3">
            {peppers ? <PeppersCard product={peppers} /> : null}
            {addOnProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
