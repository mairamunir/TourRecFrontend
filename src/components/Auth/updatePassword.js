import { Box,Paper, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const UpdatePassword = () => {
  const token = useSelector((state) => state.user.token);
const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      oldPassword: "",
      newPassword: "",
    },
    onSubmit: async (values,{resetForm}) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/profile/updatePassword",
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.status === 200) {
          toast.success(response.data.msg);
          resetForm();
        } else {
          toast.error(response.data.msg || response.statusText);
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          toast.error(error.response.data.msg);
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response from the server. Please try again later.");
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("An error occurred. Please try again.");
        }
        console.error("Update error:", error);
      }
    }
  });

  return (
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
        <ArrowBackIos onClick={()=>navigate('/')} sx={{cursor: 'pointer',float: "left" }}/>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={formik.handleSubmit}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Update Password
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
            value={formik.values.oldPassword}
            name="oldPassword"
            label="Old Password"
            type="password"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            required
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            name="newPassword"
            label="New Password"
            type="password"
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#7AA59F' }}>
            Update Password
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
export default UpdatePassword;