import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
// import { NotificationManager } from "react-notifications";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user.reducer";


const Login = () =>{
    const dispatch = useDispatch();
   
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try{
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values
      );
    
      if (response.status === 200) {
        
        toast.success(response.data.msg);
        dispatch(login(response.data.token));
        
      } else {
        toast.error(response.data.msg || response.statusText);
      }
    } catch(error){

      toast.error("An error occurred during login.");
      console.error("Login error:", error);
    }
  }
});
    return(
        <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold',marginBottom: 2 }}>
        LOG IN
      </Typography>
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
      <Button type="submit" variant="contained" sx={{backgroundColor : '#7AA59F'}}>
        Login
      </Button>
    </form>
    )
}
export default Login;