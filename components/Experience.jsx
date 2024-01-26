"use client";
import { Box, ScrollControls, Stars, useScroll } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { Overlay } from "./Overlay";

const numPages = 50;
const Experience = () => {
  return (
    <Canvas className="w-full h-full">
      <ScrollControls pages={numPages}>
        <Scene />
        <Overlay />
      </ScrollControls>
      <Stars />
    </Canvas>
  );
};

export default Experience;

const Scene = () => {
  const ref1 = useRef();
  const ref2 = useRef();
  const tl = useRef();
  const scroll = useScroll();

  const totalDuration = 2;
  useFrame(() => {
    const loopProgress = (scroll.offset * numPages) % totalDuration;
    tl.current.seek(loopProgress * tl.current.duration());
    if(loopProgress == 1.9){
    ref1.current.position.set(5, 0, -5)
    ref2.current.position.set(-5, 0, -10)
    }
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(
      [ref1.current.position, ref2.current.position],
      {
        duration: 2,
        x: 0,
        y: 0,
        z: 14,
      },
      0,
    );
  }, []);
  return (
    <>
      <Box ref={ref1} args={[1, 1, 5]} position={[5, 0, -5]}>
        <meshNormalMaterial />
      </Box>
      <Box ref={ref2} args={[1, 1, 8]} position={[-5, 0, -10]}>
        <meshNormalMaterial />
      </Box>
    </>
  );
};
