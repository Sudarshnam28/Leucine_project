// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Signup from './pages/Signup';
// // import Login from './pages/Login';
// // import CreateSoftware from './pages/CreateSoftware';
// // import RequestAccess from './pages/RequestAccess';
// // import PendingRequests from './pages/PendingRequests';


// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/signup" element={<Signup />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/create-software" element={<CreateSoftware />} />
// //         <Route path="/request-access" element={<RequestAccess />} />
// //         <Route path="/pending-requests" element={<PendingRequests />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './pages/Navbar';
// import Home from './pages/Home';
// import CreateSoftware from './pages/CreateSoftware';
// import RequestAccess from './pages/RequestAccess';
// import PendingRequests from './pages/PendingRequests';
// import Login from './pages/Login';
// import Logout from './pages/Logout';
// import ContactUs from './pages/ContactUs';

// function App() {
//   // Simulate login state
//   const [loginStatus, setLoginStatus] = useState(false);

//   // Simple login/logout togglers for demo
//   const login = () => setLoginStatus(true);
//   const logout = () => setLoginStatus(false);

//   return (
//     <Router>
//       <Navbar loginStatus={loginStatus} />
//       <div className="container mt-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/create-software" element={<CreateSoftware />} />
//           <Route path="/request-access" element={<RequestAccess />} />
//           <Route path="/pending-requests" element={<PendingRequests />} />
//           <Route path="/contact-us" element={<ContactUs />} />
//           <Route path="/login" element={<Login login={login} />} />
//           <Route path="/logout" element={<Logout logout={logout} />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import CreateSoftware from './pages/CreateSoftware';
import RequestAccess from './pages/RequestAccess';
import PendingRequests from './pages/PendingRequests';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import VerifyOtp from './pages/VerifyOtp';
import ContactUs from './pages/Contactus';
import './App.css';

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userRole, setUserRole] = useState('');

  const login = (role) => {
    setLoginStatus(true);
    setUserRole(role);
  };

  const logout = () => {
    setLoginStatus(false);
    setUserRole('');
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar loginStatus={loginStatus} userRole={userRole} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/create-software" 
              element={loginStatus && userRole === 'Admin' ? 
                <CreateSoftware /> : 
                <div className="unauthorized">Unauthorized Access</div>} 
            />
            <Route 
              path="/request-access" 
              element={loginStatus ? 
                <RequestAccess /> : 
                <div className="unauthorized">Please login to request access</div>} 
            />
            <Route 
              path="/pending-requests" 
              element={loginStatus && (userRole === 'Manager' || userRole === 'Admin') ? 
                <PendingRequests /> : 
                <div className="unauthorized">Unauthorized Access</div>} 
            />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/logout" element={<Logout logout={logout} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© 2023 User Management System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;