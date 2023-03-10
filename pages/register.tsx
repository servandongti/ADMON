import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { FormEvent, useState } from 'react'
import { supabase } from '../lib/supabase'

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await supabase.from('users').select('*').order('id')
  return {
    props: {
      users: data,
    },
  }
}

const Register: NextPage = ({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()


    setUsername('')
    setPassword('')
  }

  return (
    <div className="flex justify-center items-center flex-col gap-5 mt-14">
      <h1 className="text-3xl font-semibold">Registarse</h1>
      <form
        action='/api/form'
        method='POST'
        onSubmit={onSubmit}
        className="bg-slate-400 rounded-lg p-5 flex flex-col justify-center gap-5 items-center">
        <label className="text-white text-2xl" htmlFor="name">Nombre</label>
        <input className="bg-white rounded-lg p-2" type="text" name="name" id="name" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label className="text-white text-2xl" htmlFor="password">Password</label>
        <input className="bg-white rounded-lg p-2" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 rounded-md text-white font-bold py-2 px-4 w-full'>
          Registrarme
        </button>
      </form>
      <h2 className='mt-5 font-medium text-2xl'>Usuarios registrados</h2>
      <ul className="flex flex-col gap-5">
        {
          users.map((u: { id: number, name: string }) => (
            <li key={u.id} className="flex flex-col justify-center gap-5 items-center">
              <p className="text-black text-2xl">{u.id} - {u.name}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Register
