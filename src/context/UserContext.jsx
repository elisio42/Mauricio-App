import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error) => {
    let message = 'Ocorreu um erro inesperado.';

    if (error.code) {
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'O endereço de e-mail não é válido.';
          break;
        case 'auth/user-not-found':
          message = 'Nenhum usuário encontrado com este endereço de e-mail.';
          break;
        case 'auth/wrong-password':
          message = 'A senha está incorreta.';
          break;
        case 'auth/email-already-in-use':
          message = 'O endereço de e-mail já está em uso.';
          break;
        case 'auth/invalid-credential':
          message = 'Email ou palavra passe invalido.';
          break;
        // Adicione mais casos conforme necessário
        default:
          message = 'Ocorreu um erro: ' + error.message;
      }
    }

    setError(message);
    console.error('Erro de autenticação:', error);
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp, 
    signOutUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

