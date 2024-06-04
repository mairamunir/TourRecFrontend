import CardComponent from "./CardUniversal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

const LandmarksPage = () => {
  const [landmarks, setLandmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector((state) => state.user.token);
  const isAdmin = useSelector((state)=>state.user.roles.admin)
  const navigate = useNavigate();

  const fetchLandmarks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/landmark/getAll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.data) {
        setLandmarks(response.data.data);
        setSearchResults(response.data.data); // Ensure search results are set initially
      } else {
        toast.error(response.data.msg || 'Error fetching cities');
      }
    } catch (error) {
      console.error('Error fetching landmarks:', error);
      toast.error('Error fetching cities.');
    }
  };

  useEffect(() => {
    if (searchName === "all") {
      fetchLandmarks();
    } else {
      searchLandmark();
    }
  }, [searchName]);

  const searchLandmark = async () => {
    try {
      let response;
      if (searchName === "name") {
        response = await axios.post("http://localhost:3000/landmark/getByName", { name: searchQuery }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else if (searchName === "city") {
        response = await axios.post("http://localhost:3000/landmark/getByCityName", { city: searchQuery }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      console.log('Response:', response);
      if (response.data.data) {
        // Check if response.data.data is an array or object
        if (Array.isArray(response.data.data)) {
          setSearchResults(response.data.data);
        } else {
          setSearchResults([response.data.data]);
        }
      } else {
        toast.error(response.data.msg || 'No Landmark found.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching Landmark:', error);
      toast.error('Error searching Landmark.');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchLandmark();
    } else {
      toast.warning('Please enter a search query.');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ArrowBackIos onClick={() => navigate('/userPage')} sx={{ cursor: 'pointer', float: "left", marginTop: 2, marginLeft: 2, marginBottom: 2 }} />
        <Typography variant="body1" sx={{ marginLeft: 1 }}>Back to Home Page</Typography>
      </Box>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px' }}>
          <h1>Landmarks!</h1>
          <p>This is where you can discover famous landmarks to visit.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px' }}>
            <input
              style={{ marginRight: '10px' }}
              type="text"
              placeholder="Search query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select style={{ marginRight: '10px' }} value={searchName} onChange={(e) => setSearchName(e.target.value)}>
              <option value="all">All</option>
              <option value="city">By City</option>
              <option value="name">By Name</option>
            </select>

            <button style={{ marginLeft: '10px' }} onClick={handleSearch}>Search</button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {searchResults.length > 0 ? (
              searchResults.map(landmark => (
                <CardComponent key={landmark._id} image={landmark.image} title={landmark.name}
                  subtitle={landmark.type}
                  additionalInfo= {`${landmark.city.name}`} 
                  isAdmin={isAdmin}/>
              ))
            ) : (
              <p>No landmarks found.</p>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default LandmarksPage;
