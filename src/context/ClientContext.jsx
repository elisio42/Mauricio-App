// ClientsContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Create context
const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'clients'),
      (querySnapshot) => {
        const clientsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClients(clientsData);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);
  
  const createClient = async (clientData) => {
    setLoading(true);
    setError(null);
    try {
      const docRef = await addDoc(collection(db, 'clients'), clientData);
      // No need to manually update clients here; onSnapshot will handle it
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, 'clients', id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateClient = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const clientDoc = doc(db, 'clients', id);
      await updateDoc(clientDoc, updatedData);
      // No need to manually update clients here; onSnapshot will handle it
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const fileRef = ref(storage, `files/${file.name}`);
      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    clients,
    loading,
    error,
    createClient,
    deleteClient,
    updateClient,
    uploadFile
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
