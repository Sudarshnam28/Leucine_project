// // import React from 'react';
// // import { NavLink } from 'react-router-dom';

// // const Navbar = ({ loginStatus }) => {
// //   return (
// //     <nav className="navbar navbar-expand-lg bg-body-green" style={{ height: '80px' }}>
// //       <div className="container-fluid">
// //         <NavLink className="navbar-brand" to="/">
// //           <img src="assets/images/logo1.png" alt="Logo" style={{ height: '100px', width: '150px' }} />
// //         </NavLink>

// //         <button
// //           className="navbar-toggler"
// //           type="button"
// //           data-bs-toggle="collapse"
// //           data-bs-target="#navbarSupportedContent"
// //           aria-controls="navbarSupportedContent"
// //           aria-expanded="false"
// //           aria-label="Toggle navigation"
// //         >
// //           <span className="navbar-toggler-icon" />
// //         </button>

// //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
// //           <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ listStyleType: 'none' }}>
// //             <li className="nav-item">
// //               <NavLink className="nav-link" to="/home" activeclassname="active">
// //                 Home
// //               </NavLink>
// //             </li>

// //             <li className="nav-item">
// //               <NavLink className="nav-link" to="/create-software" activeclassname="active">
// //                 Create Software
// //               </NavLink>
// //             </li>

// //             <li className="nav-item">
// //               <NavLink className="nav-link" to="/request-access" activeclassname="active">
// //                 Request Access
// //               </NavLink>
// //             </li>

// //             <li className="nav-item">
// //               <NavLink className="nav-link" to="/pending-requests" activeclassname="active">
// //                 Pending Requests
// //               </NavLink>
// //             </li>

// //             <li className="nav-item">
// //               <NavLink className="nav-link" to="/contact-us" activeclassname="active">
// //                 Contact Us
// //               </NavLink>
// //             </li>
// //           </ul>

// //           <ul className="navbar-nav ms-auto" style={{ listStyleType: 'none' }}>
// //             <li className="nav-item">
// //               <NavLink
// //                 className={`nav-link ${loginStatus ? 'disabled' : ''}`}
// //                 to="/login"
// //                 tabIndex={loginStatus ? -1 : 0}
// //               >
// //                 Log In
// //               </NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink
// //                 className={`nav-link ${!loginStatus ? 'disabled' : ''}`}
// //                 to="/logout"
// //                 tabIndex={!loginStatus ? -1 : 0}
// //               >
// //                 Logout
// //               </NavLink>
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;
// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Navbar = ({ loginStatus }) => {
//   return (
//     <nav className="navbar navbar-expand-lg bg-success" style={{ height: '80px' }}>
//       <div className="container-fluid">
//         <NavLink className="navbar-brand" to="/">
//           <img src="assets/images/logo1.png" alt="Logo" style={{ height: '60px', width: '120px' }} />
//         </NavLink>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>

//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ listStyleType: 'none' }}>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/home" activeclassname="active">
//                 Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/create-software" activeclassname="active">
//                 Create Software
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/request-access" activeclassname="active">
//                 Request Access
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/pending-requests" activeclassname="active">
//                 Pending Requests
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/contact-us" activeclassname="active">
//                 Contact Us
//               </NavLink>
//             </li>
//           </ul>

//           <ul className="navbar-nav ms-auto" style={{ listStyleType: 'none' }}>
//             {!loginStatus ? (
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/login" activeclassname="active">
//                   Log In
//                 </NavLink>
//               </li>
//             ) : (
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/logout" activeclassname="active">
//                   Logout
//                 </NavLink>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ loginStatus, userRole }) => {
  const location = useLocation();
  
  // Don't show navbar on login/signup pages
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/">
            <span className="logo-icon">UMS</span>
            <span className="logo-text">User Management</span>
          </NavLink>
        </div>
        
        <nav className="navbar-links">
          <ul>
            <li>
              <NavLink to="/home" activeclassname="active">Home</NavLink>
            </li>
            
            {(userRole === 'Admin') && (
              <li>
                <NavLink to="/create-software" activeclassname="active">Create Software</NavLink>
              </li>
            )}
            
            {loginStatus && (
              <li>
                <NavLink to="/request-access" activeclassname="active">Request Access</NavLink>
              </li>
            )}
            
            {(userRole === 'Manager' || userRole === 'Admin') && (
              <li>
                <NavLink to="/pending-requests" activeclassname="active">Pending Requests</NavLink>
              </li>
            )}
            
            <li>
              <NavLink to="/contact-us" activeclassname="active">Contact Us</NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="navbar-auth">
          {loginStatus ? (
            <NavLink to="/logout" className="btn btn-outline">Logout</NavLink>
          ) : (
            <NavLink to="/login" className="btn btn-primary">Login</NavLink>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
