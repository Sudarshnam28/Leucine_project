import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ logout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
