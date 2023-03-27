import { useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { AuthContext } from "./AuthContext";

export interface User {
  username: string,
  password: string,
}

const useAuth = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true);

  const login = async (user: User) => {
    setLoading(true);
    await supabase.from('users').insert([{ username: user.username, password: user.password }])
    setUsername('')
    setPassword('')
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
  const { username, password, setUsername, setPassword, login, logout, signup, loading } = useAuth()
  return (
    <AuthContext.Provider value={{ username, password, setUsername, setPassword, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
