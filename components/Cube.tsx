import { motion } from "framer-motion";

export const Cube = () => {
  return (
    <motion.div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "transparent",
        transformStyle: "preserve-3d",
        rotateX: 30,
        rotateY: 30,
      }}
      animate={{
        rotateX: 390,
        rotateY: 390,
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundImage: "url('/square.svg')",
          backgroundSize: "100% 100%",
          transform: "translateZ(50px)",
        }}
      />
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundImage: "url('/circle.svg')",
          backgroundSize: "100% 100%",
          transform: "rotateY(90deg) translateZ(50px)",
        }}
      />
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundImage: "url('/triangle.svg')",
          backgroundSize: "100% 100%",
          transform: "rotateY(180deg) translateZ(50px)",
        }}
      />
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundImage: "url('/star.svg')",
          backgroundSize: "100% 100%",
          transform: "rotateY(-90deg) translateZ(50px)",
        }}
      />
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundImage: "url('/rombo.svg')",
          backgroundSize: "100% 100%",
          transform: "rotateX(-90deg) translateZ(50px)",
        }}
      />
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundImage: "url('/rectangulo.svg')",
          backgroundSize: "100% 100%",
          transform: "rotateX(90deg) translateZ(50px)",
        }}
      />
    </motion.div>
  );
};

