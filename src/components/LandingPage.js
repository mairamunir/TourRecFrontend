import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
    // const handleAuthClick = () =>{
                  
    // }

    return(
        <Box>
        <h1>Landing Page</h1>
        <Button component={Link} to = "/authPage">Go to Auth</Button>
        </Box>
    )
}
export default LandingPage;