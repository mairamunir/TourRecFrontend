import { Button, TextField, FormControl, InputLabel, MenuItem, Select, Typography, Box, Paper } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";


const provinces = ["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan"];

const RegisterAdmin = () =>{
    const token = useSelector((state) => state.user.token);

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
                const response = await axios.get("http://localhost:3000/superAdmin/registerAdmin", values,  {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
            if (response.data.msg === "USER EXISTS") {
              toast.warn("User already exists");
            } else {
              toast.success(response.data.msg);
            }
      } catch (error) {
       
          toast.error("An error occurred during registration");
        }
      
    },
  });

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f0f4f8',
          }}>
            <Paper elevation={4} sx={{
              p: 3,
              width: '80%',
              maxWidth: '400px',
              textAlign: 'center',
              backgroundColor: '#E9F3F2',
            }}>
        <form
      style={{ display: "flex", flexDirection: "column"}}
      onSubmit={formik.handleSubmit}
    >
    
    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        REGISTER ADMIN
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
       Register
      </Button>
    </form>
    </Paper>
    </Box>
  );
    
}
export default RegisterAdmin;