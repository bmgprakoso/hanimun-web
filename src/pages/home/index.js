import React from "react";
import HeroSection from "./../../components/HeroSection";
import { useRouter } from "./../../util/router.js";
import "./styles.scss";

function HomePage(props) {
  const router = useRouter();

  return (
      <HeroSection
        color="primary"
        size="large"
        title="Lorem ipsum dolor sit amet"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper ultricies nisi sed maximus."
        buttonText="Start Free Trial"
        buttonOnClick={() => {
          router.push("/pricing");
        }}
      />
  );
}

export default HomePage;
