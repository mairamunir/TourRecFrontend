import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardComponent from './CardUniversal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowBackIos } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const CityPage = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();


  const isWishlistAdded = (activity) => {
    const wishlistAdded = wishlist.some(wishlistItem => wishlistItem.type === 'city' && wishlistItem.itemName === activity.name);
    console.log('wishlistAdded:', wishlistAdded); // Log the value of wishlistAdded
    return wishlistAdded;
  };

  const fetchCities = useCallback( async () => {
    try {
      const response = await axios.get("http://localhost:3000/city/getAll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.data) {
        setCities(response.data.data);
        setSearchResults(response.data.data);
      } else {
        toast.error(response.data.msg || 'Error fetching cities');
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
      toast.error('Error fetching cities.');
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


  const searchCity = async () => {
    try {
      let response;
      if (searchName === "province") {
        response = await axios.post("http://localhost:3000/city/getByProvinceName", { province: searchQuery }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else if (searchName === "name") {
        response = await axios.post("http://localhost:3000/city/getByCityName", { name: searchQuery }, {
          headers: {
            Authorization:`Bearer ${token}`
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
        toast.error(response.data.msg || 'No city found.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching city:', error);
      toast.error('Error searching city.');
    }
  };

  useEffect(() => {
    if (searchName === "all") {
      fetchCities();
    } else {
      searchCity();
    }
    fetchWishlist();

  }, [token, fetchCities, fetchWishlist,searchName]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchCity();
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
     
      <div style={{ padding: '20px' }}>
        <h1>Cities to Explore!</h1>
        <p>This is where you can choose the next city to explore.</p>

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
          {searchResults.map(city => (
             <CardComponent  
             key={city._id}
             image={city.image} 
             title={city.name} 
             subtitle={city.province} 
             type="city"
            itemName={city.name}
            token={token}
            wishlistAdded={isWishlistAdded(city)}
            />
          ))}
        </div>
      </div>
    </div>
    </Box>
  );
};

export default CityPage;

