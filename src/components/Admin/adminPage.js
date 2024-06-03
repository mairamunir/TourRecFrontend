import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const AdminPage = () => {

    const navigate=useNavigate();
    return (
        <div>
        <h1>Admin page</h1>
     {/* <Button onClick={()=>navigate('addLandmark')}>Add Landmark</Button> */}
        </div>
    )
}

export default AdminPage;