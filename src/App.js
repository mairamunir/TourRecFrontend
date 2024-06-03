import React from "react";
import AuthPage from "./components/Auth/authPage";
import UserPage from "./components/User/userPage";
import AdminPage from "./components/Admin/adminPage";
import SuperAdminPage from "./components/SuperAdmin/superadminPage";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import ButtonAppBar from "./components/User/ButtonAppBar";
import LandingPage from "./components/LandingPage";
import CityPage from "./components/User/CityPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TransportPage from "./components/User/TransportPage";
import ActivitiesPage from "./components/User/ActivityPage";
import HotelPage from "./components/User/HotelPage";
import RestaurantPage from "./components/User/RestaurantPage";
import LandmarksPage from "./components/User/LandmarkPage";
import GuidePage from "./components/User/GuidePage";

import NavigationBar from "./components/navBar";
import UpdatePassword from "./components/Auth/updatePassword";
import ViewDetails from "./components/User/viewProfile";
import RegisterAdmin from "./components/SuperAdmin/registerAdmin";
import ViewAllUsers from "./components/SuperAdmin/viewAllUsers";
import AddLandmarkForm from "./components/Admin/AddLandmark";
import AddHotelForm from "./components/Admin/addHotel";
import AddTransportForm from "./components/Admin/addTransport";
import AddCityForm from "./components/Admin/addCity";
import AddGuideForm from "./components/Admin/addGuide";
import DashBoard from "./components/dashBoard";
import AdminActions from "./components/Admin/adminAction";

function App() {
  const { loggedIn,roles } = useSelector((state) => state.user);

let PageComponent;
if (loggedIn) {
  if (roles.superAdmin) {
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

          <Route path ="/dashboard" element={<DashBoard/>}/>

          <Route path ="/adminActions" element={<AdminActions/>}/>

          <Route path = "/viewProfile" element= {<ViewDetails/>}/>
          {/*forms */}
          <Route path = "/updatePassword" element= {<UpdatePassword/>}/>
          <Route path = "/registerAdmin" element= {<RegisterAdmin/>}/>
          <Route path = "/addLandmark" element= {<AddLandmarkForm/>}/>
          <Route path = "/viewAllUsers" element= {<ViewAllUsers/>}/>
          <Route path = "/addHotel" element= {<AddHotelForm/>}/>
          <Route path = "/addTransport" element= {<AddTransportForm/>}/>
          <Route path = "/addCity" element= {<AddCityForm/>}/>
          <Route path = "/addGuide" element= {<AddGuideForm/>}/>

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

