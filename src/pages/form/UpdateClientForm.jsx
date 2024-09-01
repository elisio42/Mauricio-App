// UpdateClientForm.js
import React, { useState, useEffect } from 'react';
import { useClient } from '../../context/ClientContext';

const UpdateClientForm = ({ clientId, onClose }) => {
  const { clients, updateClient } = useClient();
  const [clientData, setClientData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch client data on mount or when clientId changes
  useEffect(() => {
    const client = clients.find(client => client.id === clientId);
    if (client) {
      setClientData({ name: client.name || '', email: client.email || '' });
    }
  }, [clientId, clients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await updateClient(clientId, clientData);
      onClose(); // Close the form after successful update
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-client-form">
      <h2>Update Client</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={clientData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={clientData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Client'}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateClientForm;
