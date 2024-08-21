import FeaturesSection from "@/Components/Features/page";
import Footer from "@/Components/Footer/page";
import Navbar from "@/Components/Navbar/page";
import DivisionReportsSection from "@/Components/Total Reports/page";
import WhatWeDoSection from "@/Components/Work/page";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <WhatWeDoSection></WhatWeDoSection>
      <DivisionReportsSection></DivisionReportsSection>
      <FeaturesSection></FeaturesSection>
      <Footer></Footer>
    </>
  );
}
