
//import { NotificationContainer } from "react-notifications";
import React from "react";
import AuthPage from "./components/authPage";
import UserPage from "./components/userPage";
import AdminPage from "./components/adminPage";
import SuperAdminPage from "./components/superadminPage";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ButtonAppBar from "./components/ButtonAppBar";
import LandingPage from "./components/LandingPage";
import CityPage from "./components/CityPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TransportPage from "./components/TransportPage";

function App() {
  const { loggedIn,roles } = useSelector((state) => state.user);

let PageComponent;
if (loggedIn) {
  if (roles.superadmin) {
    PageComponent = SuperAdminPage;
  } else if (roles.admin) {
    PageComponent = AdminPage;
  } else {
    PageComponent = UserPage;
  }
} else {
  PageComponent = AuthPage;
}
  
  return (
//     <div className="App">
//       <ButtonAppBar/>
      
//       <PageComponent/>
//       {/* <CityPage/> */}
   

//     <ToastContainer position="top-right"
// autoClose={2500}
// hideProgressBar={false}
// newestOnTop={false}
// closeOnClick
// rtl={false}
// pauseOnFocusLoss
// draggable
// pauseOnHover
// theme="light" />
//     </div>
<Router>
      <div className="App">
        <ButtonAppBar />
        <Routes>
          <Route path="/" element={<PageComponent />} />
          <Route path="/city" element={<CityPage />} />
          <Route path= "/user" element={<UserPage/>}/>
          <Route path ="/auth" element = {<AuthPage/>}/>
          <Route path ="/transport" element={<TransportPage/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;

