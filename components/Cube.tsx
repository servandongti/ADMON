import { useState, useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
type Props = {
  selectedShape: string;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setCorrect: React.Dispatch<React.SetStateAction<boolean>>;
};

const shapes = ["/square.svg", "/circle.svg", "/triangle.svg", "/star.svg"];


export const Cube: React.FC<Props> = ({ selectedShape, setScore, setCorrect }) => {
  const [shapeName, setShapeName] = useState<string>("/square.svg");
  const cubeRef = useRef<HTMLDivElement>(null);
  function generateRandomShape() {
    setShapeName(shapes[Math.floor(Math.random() * 4)]);
  }

  const handle3dMouseMove = (e: MouseEvent) => {
    if (!cubeRef.current) return;
    const cube = cubeRef.current;
    const cubeRect = cube.getBoundingClientRect();
    const cubeCenterX = cubeRect.left + cubeRect.width / 2;
    const cubeCenterY = cubeRect.top + cubeRect.height / 2;
    const angleX = (cubeCenterY - e.clientY) / 20;
    const angleY = (cubeCenterX - e.clientX) / 20;
    cube.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  }


  useEffect(() => {
    if (selectedShape === "") return;

    if (selectedShape !== shapeName.replace("/", "").replace(".svg", "")) {
      setCorrect(false);
      return;
    }

    if (selectedShape === shapeName.replace("/", "").replace(".svg", "")) {
      generateRandomShape();
      setScore((prev) => prev + 1);
      setCorrect(true);
    }

  }, [selectedShape]);

  useEffect(() => {
    window.addEventListener("mousemove", handle3dMouseMove);
    return () => {
      window.removeEventListener("mousemove", handle3dMouseMove);
    };
  }, []);

  return (
    <motion.div
      animate={{ rotateX: 360, rotateY: 360 }}
      ref={cubeRef}
      className="shape"
      style={{
        width: "300px",
        height: "300px",
        backgroundImage: `url('${shapeName}')`,
        backgroundSize: "100% 100%",
        borderRadius: "10px",
      }}
    />
  );
};
