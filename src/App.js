
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
    <div className="App">
      <ButtonAppBar/>
      {loggedIn ? <PageComponent /> : <LandingPage />}
      {/* <PageComponent/> */}
    {/* {loggedIn ? <UserPage /> : <AuthPage />} */}

    <ToastContainer position="top-right"
autoClose={2500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light" />
    </div>
  
  );
}

export default App;
