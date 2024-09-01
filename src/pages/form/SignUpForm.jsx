import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';

const SignUpForm = () => {
  const { signUp, error, loading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    // Clear any previous form errors
    setFormError('');

    try {
      // Create a new user
      await signUp(email, password);
      // Clear form fields on successful sign-up
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      // Handle any errors from sign-up
      setFormError(err.message);
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      {formError && <p className="error">{formError}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
