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
import ActivitiesPage from "./components/ActivityPage";
import HotelPage from "./components/HotelPage";
import RestaurantPage from "./components/RestaurantPage";
import LandmarksPage from "./components/LandmarkPage";
import GuidePage from "./components/GuidePage";
import LogoutComponent from "./components/LogoutComp";
import NavigationBar from "./components/navBar";

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
<Router>
      <div className="App">
        <ButtonAppBar />
     
        {loggedIn && <NavigationBar/>}
        <Routes>
          <Route path="/" element={<PageComponent />} />
          <Route path="/city" element={<CityPage />} />
          <Route path= "/user" element={<UserPage/>}/>
          <Route path ="/auth" element = {<AuthPage/>}/>

          <Route path ="/hotel" element = {<HotelPage/>}/>

          <Route path ="/activity" element = {<ActivitiesPage/>}/>

          <Route path ="/restaurant" element = {<RestaurantPage/>}/>

          <Route path ="/landmark" element = {<LandmarksPage/>}/>

          <Route path ="/guide" element = {<GuidePage/>}/>

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

