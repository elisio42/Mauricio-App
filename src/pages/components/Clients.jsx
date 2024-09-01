// Clients.js
import React, { useState } from 'react';
import { useClient } from '../../context/ClientContext';
import UpdateClientForm from '../form/UpdateClientForm'; // Import the update form
import { useUser } from '../../context/UserContext';

export const Clients = () => {
  const { clients, loading, deleteClient } = useClient();
  const { user } = useUser();
  const [selectedClient, setSelectedClient] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  if (loading) {
    return <p>Loading ...</p>;
  }

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setShowUpdateForm(true);
  };

  return (
    <div>
      <p>{ user.emal }</p>
      {!showUpdateForm ? (
        <div>
          {clients.map(({ id, firstName, lastName, photo, email }) => (
            <div key={id}>
              <p>{firstName} { lastName }</p>
              <p>{ email }</p>
              <img src={photo} />
              <button onClick={() => handleClientClick({id, firstName, lastName, photo, email })}>
                View Details
              </button>
              <button onClick={() => deleteClient(id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <UpdateClientForm
          clientId={selectedClient.id}
          onClose={() => setShowUpdateForm(false)}
        />
      )}
    </div>
  );
};
