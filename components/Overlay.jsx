import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const Section = (props) => {
  return (
    <section
      className={`h-screen flex flex-col justify-center p-10 ${
        props.right ? "items-end" : "items-start"
      }`}
      style={{
        opacity: props.opacity,
      }}
    >
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-lg w-full">
          <div className="">{props.children}</div>
        </div>
      </div>
    </section>
  );
};

export const Overlay = () => {
  const scroll = useScroll();
  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);

  useFrame(() => {
    setOpacityFirstSection(1 - scroll.range(0, 1 / 3));
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
    setOpacityLastSection(scroll.range(2 / 3, 1 / 3));
  });

  return (
    <Scroll html>
      <div class="w-screen">
        <div
          style={{
            opacity: opacityFirstSection,
          }}
          className="w-screen h-screen flex items-center justify-center"
        >
          <div className="text-9xl text-white text-center font-bold">
            A Story of <br/> Love and Hate
          </div>
        </div>
        <Section  opacity={opacitySecondSection}>
          <h1 className="text-9xl text-white  font-bold">
            Between Songy and Haseeb
          </h1>
        </Section>
        <div
          style={{
            opacity: opacityLastSection,
          }}
          className="w-screen h-screen flex items-center justify-center"
        >
          <h1 className="text-9xl text-white  font-bold">
            HIRE ME
          </h1>
        </div>
      </div>
    </Scroll>
  );
};
