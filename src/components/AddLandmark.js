// import {
//     Button,
//     Checkbox,
//     FormControl,
//     InputLabel,
//     ListItemText,
//     MenuItem,
//     OutlinedInput,
//     Select,
//     TextField,
//     Typography
//   } from "@mui/material";
//   import axios from "axios";
//   import { useFormik } from "formik";
//   import { NotificationManager } from "react-notifications";
//   import { useSelector } from "react-redux";
  
//   const AddLandmarkForm = () => {
//     const token = useSelector((state) => state.user.token);
//     const formik = useFormik({
//       initialValues: {
//         name: "",
//         image: "",
//         description: ""
//       },
//       onSubmit: async (values) => {
//         const response = await axios({
//           method: "POST",
//           url: "http://localhost:3000/landmark/addLandmark",
//           data: values,
//           headers: { Authorization: Bearer ${token} },
//         });
  
//         NotificationManager.success("SUCCESS");
//         // if (
//         //   response.data.msg === "CREATED INGREDIENT" &&
//         //   response.status === 200
//         // ) {
//         // } else {
//         //   NotificationManager.error("ERROR");
//         // }
//       },
//     });
  
//     return (
//       <form
//       style={{ display: "flex", flexDirection: "column" }}
//       onSubmit={formik.handleSubmit}
//     >
//       <Typography variant="h4" sx={{ fontWeight: 'bold',marginBottom: 2 }}>
//         ADD LANDMARK 
//       </Typography>

//         <TextField
//           onChange={formik.handleChange}
//           value={formik.values.name}
//           name="name"
//           label="Name"
//           variant="outlined"
//           sx={{ marginBottom: 2 }}
//         />
//         <TextField
//           onChange={formik.handleChange}
//           value={formik.values.description}
//           name="description"
//           label="description"
//           variant="outlined"
//           sx={{ marginBottom: 2 }}
//         />
//         <TextField
//           onChange={formik.handleChange}
//           value={formik.values.image}
//           name="image"
//           label="Image"
//           variant="outlined"
//           sx={{ marginBottom: 2 }}
//         />
  
//   <Button type="submit" variant="contained" sx={{backgroundColor : '#7AA59F'}}>
//         Submit
//       </Button>
//       </form>
//     );
//   };
  
//   export default AddLandmarkForm;