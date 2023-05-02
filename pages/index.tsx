import { User } from "@supabase/supabase-js";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Cube } from "../components/Cube";
import SelectDemo from "../components/Select";
import { supabase } from "../lib/supabase";

const colorBlindOptions = [
  "protanopia",
  "deuteranopia",
  "tritanopia",
]

export type SelectedValue = "protanopia" | "deuteranopia" | "tritanopia";

const Home: NextPage = () => {
  const router = useRouter();
  const [selectedShape, setSelectedShape] = useState("");
  const [selectedValue, setSelectedValue] = useState<SelectedValue>("protanopia");
  const [attemtps, setAttempts] = useState(4);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

  const correctClassName = correct ? "border-green-500" : "border-red-500";

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
      <nav className="z-10 flex flex-row justify-between w-full max-w-4xl px-4 py-6">
        <div className="w-32 h-20 bg-slate-400 text-white flex justify-center items-center rounded-md">
          Puntuación: {score}
        </div>
        <div className="w-32 h-20 bg-slate-400 text-white flex justify-center items-center rounded-md">
          Intentos: {0}
        </div>

      </nav>

      <main className="flex w-full flex-1 flex-col gap-3 items-center justify-center px-20 py-5 text-center">
        <SelectDemo values={colorBlindOptions} label="Tipo de Daltonismo" setSelectedValue={setSelectedValue} />
        <Cube
          selectedShape={selectedShape}
          setScore={setScore}
          setCorrect={setCorrect}
        />
      </main>

      <p className="text-sm md:text-xl font-semibold py-3">
        Selecciona la figura correcta
      </p>
      <footer
        className={`z-10 flex gap-5 h-24 w-full max-w-5xl items-center justify-center border-2 ${correctClassName}`}
      >
        {["/square.svg", "/circle.svg", "/triangle.svg", "/star.svg"].map(
          (image, index) => (
            <div
              key={index}
              onClick={() =>
                setSelectedShape(image.replace("/", "").replace(".svg", ""))
              }
              className={`cursor-pointer w-20 h-20 bg-slate-400 text-white flex gap-5 justify-center items-center rounded-md`}
            >
              <Image src={image} alt={`image-square`} width={40} height={40} />
            </div>
          )
        )}
      </footer>
    </div>
  );
};

export default Home;
