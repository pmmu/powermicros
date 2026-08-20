import Image from "next/image";
import { CustomGrowPlanner } from "@/components/CustomGrowPlanner";
import { ServiceAreaNotice } from "@/components/ServiceAreaNotice";

export default function CustomGrowPage() {
  return (
    <>
      <section className="page-intro market-intro">
        <div className="container page-intro-grid">
          <div>
            <p className="eyebrow">Custom grow requests</p>
            <h1>Plan a crop before we plant it.</h1>
            <p>
              Pick grow slots for microgreens, herbs, peppers, and seasonal farm crops. We confirm the final schedule before anything is planted.
            </p>
            <ServiceAreaNotice />
          </div>
          <Image src="/farm/microgreens-grow-rack.jpg" alt="Microgreens trays growing on a rack under lights" width={1200} height={900} sizes="(max-width: 900px) 100vw, 38vw" className="page-intro-image" />
        </div>
      </section>
      <CustomGrowPlanner />
    </>
  );
}
