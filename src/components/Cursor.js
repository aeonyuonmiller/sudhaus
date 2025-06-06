"use client";

import { motion, useSpring } from "framer-motion";
import styled from '@emotion/styled';

const Wrapper = styled(motion.div)`
position: absolute;
  width: 100%;
  height: 100%;
  /* pointer-events: auto; */
  z-index: 2;
  `;

const Element = styled(motion.div)`
  width: 160px;
  height: 160px;
  background: blue;
  border-radius: 100%;
  z-index: 999;
`;

const SPRING = {
  mass: 0.1,
  damping: 16,
  stiffness: 70,
};

const EASY = {
  mass: 0.3,
  damping: 16,
  stiffness: 70,
};

export default function MotionValueBasics() {
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const scale = useSpring(0, EASY);
  const opacity = useSpring(0, EASY);

  return (
    <Wrapper
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - bounds.left - 80);
        y.set(e.clientY - bounds.top - 80);
      }}
      onPointerEnter={() => { scale.set(1); opacity.set(1); }}
      onPointerLeave={() => { scale.set(0); opacity.set(0); }}
    >
      <Element style={{ x, y, scale, opacity }} />
    </Wrapper>
  );
}