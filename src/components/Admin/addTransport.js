import { Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography, Paper, Box } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import { useSelector } from "react-redux";
const AddTransportForm = () =>{
  const navigate = useNavigate();
const token =useSelector((state)=>state.user.token);

    const formik = useFormik({
        initialValues: {
          type: "",
          city: "",
          image:"",
          contact: "",
          company:"",
        },
        onSubmit: async (values) => {
            try {
                const response = await axios({
                    method: "PUT",
                    url: "http://localhost:3000/transport/addTransport",
                    data: values,
                    headers: { Authorization: `Bearer ${token} `},
                  });
                if (response.data.msg === "TRANSPORT EXISTS") {
                  toast.warn("Transport already exists");
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
        ADD TRANSPORT
      </Typography>
      <TextField
      required
        onChange={formik.handleChange}
        value={formik.values.type}
        name="type"
        label="Type"
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
        value={formik.values.company}
        name="company"
        label="company"
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
export default AddTransportForm;