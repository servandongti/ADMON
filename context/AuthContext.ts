// Auth context for managing user authentication with supabase
import { createContext } from 'react';
import { User } from './AuthProvider';


interface AuthContextProps {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  username: "",
  password: '',
  setUsername: () => { },
  setPassword: () => { },
  login: () => { },
  logout: () => { },
  loading: false,
});

