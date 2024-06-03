import { Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography, Box, Paper } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
const AddHotelForm = () =>{
  const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          name: "",
          city: "",
          image:"",
          contact: "",
          website:"",
          branch:"",
        },
        onSubmit: async (values) => {
          
          try {
            const response = await axios.post("http://localhost:3000/hotel/addHotel", {
              ...values,
            });
            if (response.data.msg === "HOTEL EXISTS") {
              toast.warn("Hotel already exists");
            } else {
              toast.success(response.data.msg);
            }
      } catch (error) {
       
          toast.error("An error occurred while adding");
        }
      
    },
  });

    return(
        // <ArrowBackIos onClick={()=>navigate('/adminPage')} sx={{cursor: 'pointer',float: "left" }}/>
       <Box  sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
>

       <Paper elevation={4}
        sx={{
          p: 3,
          width: "80%",
          maxWidth: "25%",
          textAlign: "center",
          backgroundColor: "#E9F3F2",
        }}>
            <ArrowBackIos onClick={()=>navigate('/adminActions')} sx={{cursor: 'pointer',float: "left" }}/>
        <form
      style={{ display: "flex", flexDirection: "column"}}
      onSubmit={formik.handleSubmit}
    >
    
    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        ADD HOTEL
      </Typography>
      <TextField
      required
        onChange={formik.handleChange}
        value={formik.values.name}
        name="name"
        label="Name"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
    
      <TextField
      required
        onChange={formik.handleChange}
        value={formik.values.image}
        name="image"
        label="Image"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
      required
        onChange={formik.handleChange}
        value={formik.values.city}
        name="city"
        label="city"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
      required
        onChange={formik.handleChange}
        value={formik.values.contact}
        name="contact"
        label="contact"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
      required
        onChange={formik.handleChange}
        value={formik.values.website}
        name="website"
        label="website"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
       <TextField
      required
        onChange={formik.handleChange}
        value={formik.values.branch}
        name="branch"
        label="branch"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />

      <Button type="submit" variant="contained" sx={{backgroundColor : '#7AA59F',  '&:hover':{
        backgroundColor : '#02564E',
      }}}>
        ADD
      </Button>
    </form>
    </Paper>
   </Box> 
  );
    
}
export default AddHotelForm;