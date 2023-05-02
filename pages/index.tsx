import { User } from "@supabase/supabase-js";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Cube } from "../components/Cube";
import SelectDemo from "../components/Select";
import confetti from "canvas-confetti";
import { supabase } from "../lib/supabase";

const colorBlindOptions = ["protanopia", "deuteranopia", "tritanopia"];

export const protanopiaImages = [
  "/protanopia/Protanopia-square.svg",
  "/protanopia/Protanopia-circle.svg",
  "/protanopia/Protanopia-triangle.svg",
  "/protanopia/Protanopia-star.svg",
];

export const deuteranopiaImages = [
  "/deuteranopia/Deuteranopia-square.svg",
  "/deuteranopia/Deuteranopia-circle.svg",
  "/deuteranopia/Deuteranopia-triangle.svg",
  "/deuteranopia/Deuteranopia-star.svg",
];

export const tritanopiaImages = [
  "/tritanopia/Tritanopia-square.svg",
  "/tritanopia/Tritanopia-circle.svg",
  "/tritanopia/Tritanopia-triangle.svg",
  "/tritanopia/Tritanopia-star.svg",
];

export const normalImages = [
  "/square.svg",
  "/circle.svg",
  "/triangle.svg",
  "/star.svg",
];

export type SelectedValue = "protanopia" | "deuteranopia" | "tritanopia";
export type Level = "Facil" | "Medio" | "Dificil";

const levels: Level[] = ["Facil", "Medio", "Dificil"];

const Home: NextPage = () => {
  const router = useRouter();
  const [selectedShape, setSelectedShape] = useState("");
  const [selectedValue, setSelectedValue] = useState<SelectedValue | Level>(
    "protanopia"
  );
  const [selectedLevel, setSelectedLevel] = useState<SelectedValue | Level>(
    "Facil"
  );
  const [attempts, setAttempts] = useState(5);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Selecciona la figura correcta con su color correspondiente");
  const [correct, setCorrect] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const startConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      setUser(session?.data.session?.user ?? null);
    };
    getSession();

    return () => {
      setUser(null);
    };
  }, []);

  useEffect(() => {
    switch (selectedLevel) {
      case "Facil".toLowerCase():
        setAttempts(5);
        break;
      case "Medio".toLowerCase():
        setAttempts(3);
        break;
      case "Dificil".toLowerCase():
        setAttempts(1);
        break;
      default:
        setAttempts(5);
    }
  }, [selectedLevel])

  useEffect(() => {
    // score cant be lower than 0
    if (score < 0) {
      setScore(0);
      return;
    }

    if (attempts === 0) {
      setMessage("¡Perdiste! Intentalo de nuevo");
      setScore(0);
      const interval = setInterval(() => {
        setAttempts(5);
        setSelectedShape("");
        setSelectedLevel("Facil")
        setMessage("Selecciona la figura correcta con su color correspondiente");
        clearInterval(interval);
      }, 2500);
    }

    if (score >= 10) {
      startConfetti();
      setMessage("¡Felicidades! Has ganado")
      const interval = setInterval(() => {
        setScore(0);
        setAttempts(5);
        setSelectedShape("");
        setMessage("Selecciona la figura correcta con su color correspondiente");
        setSelectedValue("protanopia");
        setSelectedLevel("Facil");
        setCorrect(false);
      }, 3500);
      return () => {
        clearInterval(interval);
      }
    }

    return () => {
      confetti.reset();

    }
  }, [score]);

  const correctClassName = correct ? "bg-green-400 text-white" : "bg-red-400 text-white";

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

  const shapes = handleImageBySelectedValue();


  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Juego Clasificador de Formas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user && (
        <div
          className="flex justify-center items-center z-50 absolute bg-black w-full h-full"
          style={{ backgroundColor: "rgba(55,55,55,0.5)" }}
        >
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => router.push("/register")}
          >
            Jugar
          </button>
        </div>
      )}
      <nav className="flex flex-row justify-between w-full max-w-4xl px-4 py-6 relative">
        <div
          className={`${correctClassName} inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] shadow-[0_2px_10px] shadow-black/10 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-slate-600 outline-none`}
        >
          Puntuación: {score}
        </div>
        <div className="flex gap-5">
          <SelectDemo
            values={colorBlindOptions}
            label="Tipo de Daltonismo"
            setSelectedValue={setSelectedValue}
            placeholder="Selecciona un tipo de daltonismo"
          />
          <SelectDemo
            values={levels}
            label="Nivel"
            setSelectedValue={setSelectedLevel}
            placeholder="Selecciona un nivel"
          />
        </div>
        <div className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white shadow-[0_2px_10px] shadow-black/10 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-slate-600 outline-none">
          Intentos: <span className="text-violet-500">{attempts}</span>
        </div>
      </nav>

      <main className="flex w-full flex-1 flex-col gap-3 items-center justify-center px-20 py-5 text-center relative">
        <Cube
          selectedShape={selectedShape}
          selectedValue={selectedValue as SelectedValue}
          level={selectedLevel as Level}
          setScore={setScore}
          setCorrect={setCorrect}
          setAttempts={setAttempts}
        />
      </main>

      <p className="text-transparent font-semibold py-5 text-sm text-center md:text-lg bg-clip-text bg-gradient-to-r from-violet-500 to-violet-900">
        {message}
      </p>
      <footer
        className={`inline-flex gap-5 h-24 w-full max-w-3xl bg-[#fbfaff] rounded items-center justify-center px-[15px] relative`}
      >
        {shapes.map((shape, index) => (
          <div
            key={index}
            onClick={() => setSelectedShape(shape)}
            className={`cursor-pointer w-20 h-20 bg-slate-400 text-white flex gap-5 justify-center items-center rounded-md`}
          >
            <Image src={shape} alt={`image-square`} width={40} height={40} />
          </div>
        ))}
      </footer>
    </div>
  );
};

export default Home;
