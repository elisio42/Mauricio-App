import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Input} from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const SignInForm = () => {
  const { signIn, error, loading } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
    nav('/')
  };

  return (
    <div className="sign-in-form">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='flex-col flex gap-2 mb-4'>
          <label className='text-sm'>Email</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='flex-col flex gap-2 mb-4'>
          <label className='text-sm'>Password</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button className="mb-6" type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
