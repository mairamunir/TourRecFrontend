import { Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
//import {NotificationContainer, NotificationManager } from "react-notifications";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const provinces = ["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan"];

const SignUp = () =>{
  

    const formik = useFormik({
        initialValues: {
          firstName: "",
          lastName: "",
          email: "",
          city: "",
          province: "",
          password: "",
        },
        onSubmit: async (values) => {
          
          try {
            const response = await axios.post("http://localhost:3000/auth/signup", {
              ...values,
              admin: false,
            });
            if (response.data.msg === "USER EXISTS") {
              toast.warn("User already exists");
            } else {
              toast.success(response.data.msg);
            }
      } catch (error) {
       
          toast.error("An error occurred during sign up");
        }
      
    },
  });

    return(
      
        <form
      style={{ display: "flex", flexDirection: "column"}}
      onSubmit={formik.handleSubmit}
    >
    
    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        SIGN UP
      </Typography>
      <TextField
      required
        onChange={formik.handleChange}
        value={formik.values.firstName}
        name="firstName"
        label="First Name"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
      <TextField
      required
        onChange={formik.handleChange}
        value={formik.values.lastName}
        name="lastName"
        label="Last Name"
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
        value={formik.values.password}
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      />
       <TextField
       required
        onChange={formik.handleChange}
        value={formik.values.city}
        name="city"
        label="City"
        variant="outlined"
        sx={{ marginBottom: 2 }}
      /> 
     <FormControl variant="outlined" sx={{ marginBottom: 2 }}>
        <InputLabel required>Province</InputLabel>
        <Select
          required
          name="province"
          value={formik.values.province}
          onChange={formik.handleChange}
          label="Province"
        >
          {provinces.map((province) => (
            <MenuItem key={province} value={province}>
              {province}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" sx={{backgroundColor : '#7AA59F'}}>
        Sign Up
      </Button>
    </form>
   
  );
    
}
export default SignUp;