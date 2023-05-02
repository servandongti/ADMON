import { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import { deuteranopiaImages, Level, normalImages, protanopiaImages, SelectedValue, tritanopiaImages } from "../pages";

type Props = {
  selectedShape: string;
  selectedValue: SelectedValue;
  level: Level;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
};


export const Cube: React.FC<Props> = ({ selectedShape, selectedValue, setScore, setCorrect, setAttempts }) => {
  const [shapeName, setShapeName] = useState<string>(normalImages[0])
  const cubeRef = useRef<HTMLDivElement>(null);

  const handleImageBySelectedValue = () => {
    switch (selectedValue) {
      case "protanopia":
        return protanopiaImages;
      case "deuteranopia":
        return deuteranopiaImages;
      case "tritanopia":
        return tritanopiaImages;
      default:
        return normalImages;
    }
  };

  function generateRandomShape() {
    const image = handleImageBySelectedValue();
    let newShapeName = shapeName;
    while (newShapeName === shapeName) {
      newShapeName = image[Math.floor(Math.random() * 4)];
    }
    setShapeName(newShapeName);
  }


  // change image according to selected value 
  useEffect(() => {
    generateRandomShape();
  }, [selectedValue]);

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
    if (selectedShape === shapeName) {
      setCorrect(true);
      setScore((prev) => prev + 1);
      generateRandomShape();
    } else {
      setCorrect(false);
      setScore((prev) => prev - 1);
      setAttempts((prev) => prev - 1);
    }
  }, [selectedShape, selectedValue]);

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
