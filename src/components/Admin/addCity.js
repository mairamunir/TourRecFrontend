import { Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography, Box, Paper } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";
const AddCityForm = () =>{
  const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          name: "",
          country: "Pakistan",
          image:"",
          province: "",
        },
        onSubmit: async (values) => {
          
          try {
            const response = await axios.post("http://localhost:3000/city/addCity", {
              ...values,
            });
            if (response.data.msg === "CITY EXISTS") {
              toast.warn("City already exists");
            } else {
              toast.success(response.data.msg);
            }
      } catch (error) {
       
          toast.error("An error occurred while adding");
        }
      
    },
  });

    return(
      <Box  sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
    
        <Paper  elevation={4}
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
        ADD CITY
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
        value={formik.values.province}
        name="province"
        label="Province"
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
export default AddCityForm;
