import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Link from 'next/link'
import React, { FormEvent, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { User } from '../context/AuthProvider'
import { supabase } from '../lib/supabase'

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await supabase.from('users').select('*').order('id')
  return {
    props: {
      users: data,
    },
  }
}

interface RegisterProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>,
  setPassword: (password: string) => void,
  setUsername: (username: string) => void,
}

function RegisterComponent({ handleSubmit, setPassword, setUsername }: RegisterProps) {

  return (
    <React.Fragment>
      <h1 className="text-3xl font-semibold">Registarse</h1>
      <form
        action='/api/form'
        method='POST'
        onSubmit={handleSubmit}
        className="bg-slate-400 rounded-lg p-5 flex flex-col justify-center gap-5 items-center">
        <label className="text-white text-2xl" htmlFor="username">Nombre</label>
        <input className="bg-white rounded-lg p-2" type="text" name="username" id="username" onChange={(e) => setUsername(e.target.value)} />
        <label className="text-white text-2xl" htmlFor="password">Password</label>
        <input className="bg-white rounded-lg p-2" type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 rounded-md text-white font-bold py-2 px-4 w-full'>
          Registrarme
        </button>
      </form>
    </React.Fragment>
  )
}

const Register: NextPage = ({ users }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { login } = useContext(AuthContext)
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [user, setUser] = React.useState<User>()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setUser({ username, password })
  }

  const handleLogin = async (user: User) => {
    login(user)
  }

  React.useEffect(() => {
    if (user) {
      handleLogin(user)
    } else {
      return
    }
    return () => {
      setUser(undefined)
    }
  }, [user])

  return (
    <div className="flex justify-center items-center flex-col gap-5 mt-14">
      {
        !user ? (
          <RegisterComponent handleSubmit={handleSubmit} setPassword={setPassword} setUsername={setUsername} />
        ) : (
          <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className="text-3xl font-semibold">Bienvenido <span className='capitalize text-sky-500'>{user.username}</span></h1>
            <p className='text-center max-w-sm'>¡Felicitaciones! Te has registrado con éxito con nosotros. ¡Gracias por unirte a nuestra comunidad!</p>
            <Link href='/' className='underline text-sky-500'>Regresar</Link>
          </div>
        )
      }

    </div>
  )
}

export default Register
