import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Image from 'next/image';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0 }},
};

const boxVariants = {
  hidden: {
    clipPath: 'polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)',
  },
  visible: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const ScrollEffect = () => {
  const images = Array.from({ length: 12 }).map((_, i) => ({
    src: `/assets/medias/${i + 1}.jpg`,
    width: i % 2 === 0 ? 800 : 400,
  }));

  return (
    <ScrollFX
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
    >
      {images.map(({ src, width }, index) => (
        <Box
            key={index}
            initial="hidden"
            whileInView="visible"
            whileHover={{ clipPath: "polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%)", scale: 1.05, transition:{ type: "spring", duration: .8, bounce: .5 } }}
            variants={boxVariants}  
            viewport={{ once: false, amount: 0.01 }}
            style={{ flex: `0 0 ${width}px` }}
        >
              <Image src={src} alt={`image-${index + 1}`} height={500} width={width} />
              <Info>hmmmm…</Info>
        </Box>
      ))}
    </ScrollFX>
  );
};

export default ScrollEffect;

// 👇 Styled Components (No scrollbar CSS removed!)
const ScrollFX = styled.div`
  position: absolute;
  display: flex;
  gap: 40px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  left: 0;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 16px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: blue;
    border-radius: 0;
  }
`;

const Box = styled(motion.div)`
  display: grid;
  place-items: center;
  scroll-snap-align: center;
  font-size: 1rem;
  color: white;
  height: 55vh;

  clip-path: polygon(5% 5%, 95% 5%, 95% 95%, 5% 95%); // initial fallback
  will-change: transform, clip-path;

  & img {
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
  }
`;

const Info = styled(motion.div)`
    position: absolute;
    display: grid;
    place-content: center;
    bottom: 1rem;
    right : 1rem;
    font-size: 1rem;
    color: white;
    background: black;
    height: 40px;
    width: fit-content;
    padding: 1rem 2rem;
    clip-path: circle(0% at 50% 50%); // initially hidden
    will-change: transform, clip-path;
`;