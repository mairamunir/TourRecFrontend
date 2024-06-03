import ViewDetails from "../User/viewProfile";
import RegisterAdmin from "./registerAdmin";
import { useNavigate } from "react-router-dom";
const SuperAdminPage = () => {
    const navigate = useNavigate();
    return (
       <div>
        <h1>SuperAdmin page</h1>
        <button onClick={()=> navigate('/registerAdmin')}>Add new Admin</button>
        
         <button onClick={()=> navigate('/viewAllUsers')}>View All Users</button>
         </div> 
    )
}

export default SuperAdminPage;