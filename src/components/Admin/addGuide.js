import { Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography, Paper, Box } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AddGuideForm = () =>{
const navigate = useNavigate();
const token = useSelector((state) => state.user.token);
    const formik = useFormik({
        initialValues: {
          name: "",
          city: "",
          image:"",
          email: "",
          contact: "",
          website:"",
        },
        onSubmit: async (values) => {
          
            try {
                const response = await axios({
                    method: "POST",
                    url: "http://localhost:3000/guide/addGuide",
                    data: values,
                    headers: { Authorization: `Bearer ${token}` },
                  });
                if (response.data.msg === "GUIDE EXISTS") {
                  toast.warn("Guide already exists");
                } else {
                  toast.success(response.data.msg);
                }
          } catch (error) {
           
              toast.error("An error occurred while adding");
            }
          
        },
      });
    

    return(
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}>

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
        ADD GUIDE
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
        value={formik.values.email}
        name="email"
        label="Email"
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
      
        onChange={formik.handleChange}
        value={formik.values.website}
        name="website"
        label="website"
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
export default AddGuideForm;