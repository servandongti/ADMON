import { User } from "@supabase/supabase-js";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Draggable from 'react-draggable';
import { Cube } from "../components/Cube";
import { supabase } from "../lib/supabase";

const Home: NextPage = () => {
  const router = useRouter();


  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      setUser(session?.data.session?.user ?? null);
      console.log(session?.data.session?.user ?? null);
    }
    getSession();

    return () => {
      setUser(null);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Juego Clasificador de Formas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        !user && (
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
        )
      }
      <nav className="z-10 flex flex-row justify-between w-full max-w-4xl px-4 py-6">
        <div className="w-32 h-20 bg-slate-400 text-white flex justify-center items-center rounded-md">
          Puntuación: {0}
        </div>

        <div className="w-32 h-20 bg-slate-400 text-white flex justify-center items-center rounded-md">
          Intentos: {0}
        </div>
      </nav>

      <main className="z-10 flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Cube />
      </main>

      <footer className="z-10 flex gap-5 h-24 w-full max-w-5xl items-center justify-center border border-black rounded-xl">
        {["/square.svg", "/circle.svg", "/triangle.svg", "/star.svg"].map(
          (image, index) => (
            <Draggable
              key={index}
            >
              <div
                className="w-20 h-20 bg-slate-400 text-white flex gap-5 justify-center items-center rounded-md"
              >
                <Image
                  src={image}
                  key={index}
                  alt={`image-${index}`}
                  width={40}
                  height={40}
                />
              </div>
            </Draggable>
          )
        )}
      </footer>
    </div>
  );
};

export default Home;
