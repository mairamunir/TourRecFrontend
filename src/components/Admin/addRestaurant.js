//restaurant Form
import { Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography, Paper, Box } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const AddRestaurantForm = () =>{
    const token = useSelector((state) => state.user.token);
const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          name: "",
          city: "",
          image:"",
          contact: "",
          branch:"",
          description:"",
          cuisine:"",
        },
        onSubmit: async (values) => {
          
          try {
            const response = await axios({
                method: "PUT",
                url: "http://localhost:3000/restaurant/addRestaurant",
                data: values,
                headers: { Authorization: `Bearer ${token}` },
              });
            if (response.data.msg === "RESTAURANT EXISTS") {
              toast.warn("Restaurant already exists");
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

<ArrowBackIos onClick={()=>navigate('/adminPage')} sx={{cursor: 'pointer',float: "left" }}/>
      
        <form
      style={{ display: "flex", flexDirection: "column"}}
      onSubmit={formik.handleSubmit}
    >
    
    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        ADD RESTAURANT
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
        value={formik.values.branch}
        name="branch"
        label="branch"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
        <TextField
      
        onChange={formik.handleChange}
        value={formik.values.description}
        name="description"
        label="description"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
        <TextField
      required
        onChange={formik.handleChange}
        value={formik.values.cuisine}
        name="cuisine"
        label="cuisine"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <Button type="submit" variant="contained" sx={{backgroundColor : '#7AA59F', '&:hover': {
              backgroundColor: '#5e8c82'
            }
}}>
        ADD
      </Button>
    </form>
    </Paper>
        </Box>
  );
    
}
export default AddRestaurantForm;