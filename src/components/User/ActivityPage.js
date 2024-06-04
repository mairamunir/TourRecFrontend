import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardComponent from './CardUniversal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowBackIos } from '@mui/icons-material';
import { Box,Typography } from '@mui/material';
const ActivitiesPage = ({ onBack }) => {
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector((state) => state.user.token);
  const isAdmin = useSelector((state)=>state.user.roles.admin)
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  const isWishlistAdded = (activity) => {
    const wishlistAdded = wishlist.some(wishlistItem => wishlistItem.type === 'activity' && wishlistItem.itemName === activity.type);
    console.log('wishlistAdded:', wishlistAdded); // Log the value of wishlistAdded
    return wishlistAdded;
  };
  

  const fetchActivities = useCallback( async () => {
    try {
      const response = await axios.get("http://localhost:3000/activity/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data);
      if (response.data.data) {
        setActivities(response.data.data);
        setSearchResults(response.data.data);
      }
      else{
        toast.error('Error fetching activities.')
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      toast.error('Error fetching activities.')
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

  const searchActivity = async () => {
    try {
      let response;
      if (searchName === "city") {
        response = await axios.post("http://localhost:3000/activity/getByCity", { city: searchQuery }, {
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
        toast.error(response.data.msg || 'No activity found.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching activity:', error);
      toast.error('Error searching activity.');
    }
  };

  useEffect(() => {
    if (searchName === "all") {
      fetchActivities();
    } else {
      searchActivity();
    }
    fetchWishlist();
  }, [token, fetchActivities, fetchWishlist,searchName]);


  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchActivity();
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
        <h1>Activities To Do!</h1>
        <p>This is where you can choose the next adventure you want to go on.</p>

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
            {/* <option value="province">By Province</option> */}
            <option value="city">By City</option>
          </select>

          <button style={{ marginLeft: '10px' }} onClick={handleSearch}>Search</button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px'}}>
          {searchResults.map(activity => (
            <CardComponent 
            key={activity._id}
            image={activity.image} 
            title={activity.type} 
            subtitle={activity.city ? activity.city.name : 'No city info'} 
            type="activity"
            itemName={activity.type}
            token={token}
            wishlistAdded={isWishlistAdded(activity)}

            additionalInfo={activity.description} 
           isAdmin={isAdmin}
           
           />
          )
          )}
        </div>

        </div>
      </div>
    </Box>
  );
};

export default ActivitiesPage;
