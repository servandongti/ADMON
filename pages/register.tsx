import { User } from "@supabase/supabase-js";
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Link from "next/link";
import React, { FormEvent, useEffect } from "react";
import { supabase } from "../lib/supabase";

function RegisterComponent() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const handleLogin = async (email: string, password: string) => {
    await supabase.auth.signUp({
      email: email || "",
      password: password || "",
    });
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleLogin(username, password);

    setLoading(false);
  };

  return (
    <React.Fragment>
      <h1 className="text-3xl font-semibold">Registarse</h1>
      <form
        action="/api/form"
        method="POST"
        onSubmit={handleSubmit}
        className="bg-slate-400 rounded-lg p-5 flex flex-col justify-center gap-5 items-center"
      >
        <label className="text-white text-2xl" htmlFor="username">
          Email
        </label>
        <input
          className="bg-white rounded-lg p-2"
          type="text"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="text-white text-2xl" htmlFor="password">
          Password
        </label>
        <input
          className="bg-white rounded-lg p-2"
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 rounded-md text-white font-bold py-2 px-4 w-full"
        >
          Registrarme
        </button>
      </form>
    </React.Fragment>
  );
}


const Register: NextPage = () => {
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      setUser(session?.data.session?.user ?? null);
    }
    getSession();

    return () => {
      setUser(null);
    }
  }, []);

  return (
    <div className="flex justify-center items-center flex-col gap-5 mt-14">
      {!user ? (
        <RegisterComponent />
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-3xl font-semibold">
            Bienvenido{" "}
            <span className="text-sky-500">{user.email}</span>
          </h1>
          <p className="text-center max-w-sm">
            ¡Felicitaciones! Te has registrado con éxito con nosotros. ¡Gracias
            por unirte a nuestra comunidad!
          </p>
          <Link href="/" className="underline text-sky-500">
            Regresar
          </Link>
        </div>
      )}
    </div>
  );
};

export default Register;
