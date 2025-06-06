"use client";

import { motion, useSpring } from "framer-motion";
import styled from '@emotion/styled';

const Wrapper = styled(motion.div)`
position: absolute;
  width: 100%;
  height: 100vh;
  pointer-events: auto;
  z-index: 2;
  `;

const Element = styled(motion.div)`
  width: 48px;
  height: 48px;
  background: blue;
  border-radius: 100%;
  z-index: 999;
`;

const SPRING = {
  mass: 0.1,
  damping: 16,
  stiffness: 70,
};

export default function MotionValueBasics() {
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const scale = useSpring(0);

  return (
    <Wrapper
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - bounds.left - 24);
        y.set(e.clientY - bounds.top - 24);
      }}
      onPointerEnter={() => scale.set(1)}
      onPointerLeave={() => scale.set(0)}
    >
      <Element style={{ x, y, scale }} />
    </Wrapper>
  );
}