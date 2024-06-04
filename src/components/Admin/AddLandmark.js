import {
    Box,
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    TextField,
    Typography,
  } from "@mui/material";
  import { ArrowBackIos } from "@mui/icons-material";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { useFormik } from "formik";
  import { useSelector } from "react-redux";
  import { toast } from "react-toastify";
  import { useNavigate } from "react-router-dom";
  const AddLandmarkForm = () => {
    const [activities, setActivities] = useState([]);
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    useEffect(() => {
      fetchActivities();
    }, []);
  
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/activities/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.data) {
          setActivities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
  
    const formik = useFormik({
      initialValues: {
        name: "",
        image: "",
        type: "",
        website: "",
        description: "",
        city: "",
        activities: [],
      },
      onSubmit: async (values) => {
        try {
          const response = await axios.post(
            "http://localhost:3000/landmark/addLandmark",
            values,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
  
          if (response.data.msg === "LANDMARK ADDED" && response.status === 200) {
            toast.success("Landmark added successfully");
          } else {
            toast.error("Error adding landmark: " + response.data.msg);
          }
        } catch (error) {
          console.error("Error adding landmark:", error);
          toast.error("Error adding landmark");
        }
      },
    });
  
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 3,
            width: "80%",
            maxWidth: "25%",
            textAlign: "center",
            backgroundColor: "#E9F3F2",
          }}
        >
            <ArrowBackIos onClick={()=>navigate('/adminActions')} sx={{cursor: 'pointer',float: "left" }}/>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={formik.handleSubmit}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Add Landmark
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
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              label="Description"
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
              value={formik.values.type}
              name="type"
              label="Type"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              
              onChange={formik.handleChange}
              value={formik.values.website}
              name="website"
              label="Website"
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
  
            <FormControl sx={{ width: 345 }}>
              <InputLabel>Activities</InputLabel>
              <Select
                multiple
                name="activities"
                value={formik.values.activities}
                onChange={formik.handleChange}
                input={<OutlinedInput label="Activities" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {activities.map((activity) => (
                  <MenuItem key={activity._id} value={activity._id}>
                    <Checkbox checked={formik.values.activities.includes(activity._id)} />
                    <ListItemText primary={activity.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <Button
              sx={{ marginTop: 2, backgroundColor: "#7AA59F",  '&:hover':{
                backgroundColor : '#02564E',
              } }}
              type="submit"
              variant="contained"
            >
              ADD
            </Button>
          </form>
        </Paper>
      </Box>
    );
  };
  
  export default AddLandmarkForm;
  
