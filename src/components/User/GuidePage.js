import CardComponent from "./CardUniversal";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box,Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

const GuidePage = () => {
  const [guides, setGuides] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const token = useSelector((state) => state.user.token);
  const isAdmin = useSelector((state)=>state.user.roles.admin)
  const navigate = useNavigate();

  const isWishlistAdded = (activity) => {
    const wishlistAdded = wishlist.some(wishlistItem => wishlistItem.type === 'guide' && wishlistItem.itemName === activity.type);
    console.log('wishlistAdded:', wishlistAdded); // Log the value of wishlistAdded
    return wishlistAdded;
  };

  const fetchGuides = useCallback( async () => {
    try {
      const response = await axios.get("http://localhost:3000/guide/getAll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.data) {
        setGuides(response.data.data);
        setSearchResults(response.data.data);
      }
      else {
        toast.error(response.data.msg || 'Error fetching Guides.');
      }

    } catch (error) {
      console.error('Error fetching Guides:', error);
      toast.error('Error fetching Guides.');
    }
  }, [token]);

  const fetchWishlist = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/wishlist/getWishlist", {  
      headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log("Wishlist response:", response.data);
      if (Array.isArray(response.data.data)) {
        setWishlist(response.data.data);
      } else {
        setWishlist([]); // Ensure wishlist is always an array
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error.response || error.message);
      setWishlist([]); // Ensure wishlist is always an array
    }
  }, [token]);

  const searchGuide = async () => {
    try {
      let response;
      if (searchName === "city") {
        response = await axios.post("http://localhost:3000/guide/searchByCityName", { name: searchQuery }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else if (searchName === "name") {
        response = await axios.post("http://localhost:3000/guide/searchByName", { name: searchQuery }, {
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
        toast.error(response.data.msg || 'No guides found.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching guide:', error);
      toast.error('Error searching guide.');
    }
  };

  useEffect(() => {
    if (searchName === "all") {
      fetchGuides();
    } else {
      searchGuide();
    }
    fetchWishlist();
  }, [token, fetchGuides, fetchWishlist,searchName]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchGuide();
    } else {
      toast.warning('Please enter a search query.');
    }
  };

  return (
    <Box>

<Box sx={{ display: 'flex', alignItems: 'center' }}>
    <ArrowBackIos onClick={()=>navigate('/userPage')} sx={{cursor: 'pointer',float: "left", marginTop:2, marginLeft:2, marginBottom: 2 }}/>
    <Typography variant="body1" sx={{ marginLeft: 1 }}>Back to Home Page</Typography>
    </Box>
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'}} >
      <div style={{ padding: '20px' }}>
        <h1>Guides!</h1>

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
            <option value="province">By Province</option>
            <option value="name">By Name</option>
          </select>

          <button style={{ marginLeft: '10px' }} onClick={handleSearch}>Search</button>
        </div>


        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {guides.map(guide => (
            <CardComponent 
            key={guide._id} 
            image={guide.image} 
            title={guide.name} 
            subtitle={guide.number} 
            additionalInfo="email"
            type="guide"
            itemName={guide.type}
            token={token}
            wishlistAdded={isWishlistAdded(guide)}
            isAdmin={isAdmin}
 /> 
          ))}
        </div>
      </div>
    </div>
    </Box>
  );
};

export default GuidePage;

