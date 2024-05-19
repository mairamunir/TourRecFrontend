import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useDispatch } from "react-redux";
import { login } from "../redux/user.reducer";

const Login = () =>{
    const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "test1234",
    },
    onSubmit: async (values) => {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        values
      );
      if (response.data.msg === "User login successfully." && response.status === 200) {
        NotificationManager.success(response.data.msg);
        dispatch(login(response.data.token));
      } else {
        NotificationManager.error(response.data.msg || response.statusText);
      }
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
      <Button type="submit" variant="contained">
        Login
      </Button>
    </form>
    )
}
export default Login;