import { useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { AuthContext } from "./AuthContext";

export interface User {
  email: string,
  password: string,
}

const useAuth = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true);

  const login = async (user: User) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    })
    setUsername('')
    setPassword('')

    setLoading(false);

    return { data, error }
  }

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut()
    setLoading(false);
  }


  return {
    username,
    password,
    setUsername,
    setPassword,
    login,
    logout,
    loading,
  }

}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { username, password, setUsername, setPassword, login, logout, loading } = useAuth()
  return (
    <AuthContext.Provider value={{ username, password, setUsername, setPassword, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
