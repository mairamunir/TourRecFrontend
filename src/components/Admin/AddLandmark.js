 
import {
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { useFormik } from "formik";
  import { NotificationManager } from "react-notifications";
  import { useSelector } from "react-redux";
  
  const AddLandmarkForm = () => {
    const [activities, setActivities] = useState([]);
    const token = useSelector((state) => state.user.token);
   
    useEffect=()=>{
        fetchActivities();
      }
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/activities/getAll", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.data) {
          setActivities(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
  
    const formik = useFormik({
      initialValues: {
        name: "",
        image: "",
        type:"",
        website: "",
        description: "",
        city: "",
        activities: [],
      },
      onSubmit: async (values) => {
        const response = await axios({
          method: "POST",
          url: "http://localhost:3000/landmark/addLandmark",
          data: values,
          headers: { Authorization: `Bearer ${token}` },
        });
  
        NotificationManager.success("SUCCESS");
         if (
           response.data.msg === "CREATED INGREDIENT" &&
           response.status === 200
        ) {
         } else {
           NotificationManager.error("ERROR");
         }
      },
    });
  
    return (
      <form onSubmit={formik.handleSubmit}>
        <TextField
          onChange={formik.handleChange}
          value={formik.values.name}
          name="name"
          label="Name"
          variant="outlined"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.description}
          name="description"
          label="description"
          variant="outlined"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.city}
          name="city"
          label="city"
          variant="outlined"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.type}
          name="type"
          label="type"
          variant="outlined"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.website}
          name="website"
          label="website"
          variant="outlined"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.image}
          name="image"
          label="Image"
          variant="outlined"
        />
  
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Activities</InputLabel>
          <Select
            multiple
            name="activities"
            value={formik.values.activities}
            onChange={formik.handleChange}
            input={<OutlinedInput label="Activities" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {activities.map((i) => (
              <MenuItem key={i._id} value={i._id}>
                <Checkbox checked={formik.values.activities.includes(i._id)} />
                <ListItemText primary={i.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    );
  };
  
  export default AddLandmarkForm;