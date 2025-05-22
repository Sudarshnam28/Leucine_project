
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';
// import './login.css'; // Use same CSS as login

// export default function Signup() {
//   const [form, setForm] = useState({
//     name: '',
//     username: '',
//     email: '',
//     password: '',
//     role: 'Employee',
//     place: ''
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // try {
//     //   await axios.post('http://localhost:5000/api/auth/signup', form);
//     //   alert('Signup successful!');
//     //   navigate('/verify-otp', { state: { email: form.email } });
//     //   navigate('/login');
//     // } catch (error) {
//     //   alert('Signup failed. Please try again.');
//     //   console.error(error);
//     // }
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/signup', form);
//       console.log("Signup response:", res.data);
//       alert('Signup successful!');
//       navigate('/verify-otp', { state: { email: form.email } });
//     } catch (error) {
//       console.error("Signup error:", error);
//       alert('Signup failed. Please try again.');
//     }

//   };

//   const onChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="body">
//       <div className="login-container">
//         <h1 style={{ color: 'midnightblue', fontStyle: 'italic' }}>Sign Up</h1>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={onChange}
//             required
//           />
//           <input
//             type="text"
//             name="username"
//             placeholder="Username"
//             value={form.username}
//             onChange={onChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={onChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={onChange}
//             required
//             minLength={8}
//           />
//           <select name="role" value={form.role} onChange={onChange} required>
//             <option value="Employee">Employee</option>
//             <option value="Manager">Manager</option>
//             <option value="Admin">Admin</option>
//           </select>


//           <input
//             type="text"
//             name="place"
//             placeholder="Location / Place"
//             value={form.place}
//             onChange={onChange}
//             required
//           />

//           <button type="submit">Sign Up</button>
//           <h6 className="signup-link">
//             Already have an account? <Link to="/login"><u>Login here</u></Link>
//           </h6>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
       console.log('Sending request to backend'); 
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
       console.log('Backend response:', response); 
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
       console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          Registration successful! Redirecting to login...
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
      
      <div className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
};
export default Signup;