import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Cursor from "@/components/Cursor"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0 }},
};

const boxVariants = {
    hidden: {
      clipPath: 'polygon(30% 30%, 70% 30%, 70% 70%, 30% 70%)',
      y: "50%"
    },
    visible: {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        y: "0%",
        transition: {
            type: 'spring',
            bounce: 0.3,
            duration: 1,
        },
    },
};

const infoVariants = {
    hidden: {
      clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
      y: "50%"
    },
    visible: {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        y: "0%",
        transition: {
          type: 'spring',
          bounce: 0.1,
          duration: .5,
          delay: .05
        },
    },
};

const ScrollEffect = () => {
  const images = Array.from({ length: 12 }).map((_, i) => ({
    src: `/assets/medias/${i + 1}.jpg`,
    width: i % 2 === 0 ? 800 : 500,
  }));

  return (
    <ScrollFX
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      >
      {images.map(({ src, width, info }, index) => (
        <Box
            key={index}
            initial="hidden"
            whileInView="visible"
            // whileHover={{
            //     // scale: 1.01,
            //     clipPath: "polygon(1% 1%, 99% 1%, 99% 99%, 1% 99%)",
            //     transition: { ease:["easeOut", "easeInOut"], duration: .5 }
            // }}
            variants={boxVariants}  
            viewport={{ once: false, amount: 0 }}
            style={{ flex: `0 0 ${width}px` }}
        >
              <Cursor />
              <Image src={src} alt={`image-${index + 1}`} height={500} width={width} />
          <Info
            as={motion.div}
            variants={infoVariants}
            initial="hidden"
            whileInView="visible"
          >
            {info} Something &copy;
          </Info>
          </Box>
        ))}
    </ScrollFX>
  );
};

export default ScrollEffect;

const ScrollFX = styled.div`
  position: absolute;
  display: flex;
  gap: 40px;
  overflow-x: auto;
  overflow-y: hidden;
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
  /* color: white; */
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
    place-content: center end;
    bottom: 2rem;
    right : 2rem;
    left: 2rem;
    font-size: 1rem;
    color: var(--foreground);
    background: var(--text);
    min-height: 80px;
    max-height: 300px;
    padding: 1rem 1.2rem;
    will-change: transform, clip-path;
`;
