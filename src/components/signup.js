import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { NotificationManager } from "react-notifications";


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
          const response = await axios.post("http://localhost:8000/auth/signup", {
            ...values,
            admin: 'false',
          });
          NotificationManager.success(response.data.msg);
        },
      });

    return(
        <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={formik.handleSubmit}
    >
    
    
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
      <TextField
      required
      onChange={formik.handleChange}
      value={formik.values.province}
      name="province"
      label="Province"
      variant="outlined"
      sx={{ marginBottom: 2 }}
    />
    

      <Button type="submit" variant="contained">
        Sign Up
      </Button>
    
    </form>
  );
    
}
export default SignUp;