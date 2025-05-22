import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="login-container">
      <h2>Email Verification</h2>
      <form onSubmit={handleVerify}>
        <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} required />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
}
