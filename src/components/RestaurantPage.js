import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardComponent from './CardUniversal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RestaurantPage = () => {
  const [restaurant, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (searchName === "all") {
      fetchRestaurants();
    } else {
      searchRestaurant();
    }
  }, [searchName]);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:3000/restaurant/getAll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.data) {
        setRestaurants(response.data.data);
        setSearchResults(response.data.data);

      }
      else{
        toast.error(response.data.msg || 'Error fetching restaurants');
      }
    } catch (error) {
      console.error('Error fetching Restaurants:', error);
      toast.error("Error fetching restaurants.");
    }
  };

  const searchRestaurant = async () => {
    try {
      let response;
      if (searchName === "name") {
        response = await axios.post("http://localhost:3000/restaurant/getByRestaurantName", { name: searchQuery }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else if(searchName=="city"){
        response = await axios.post("http://localhost:3000/restaurant/getByCityName", { name: searchQuery }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      }
      
      else if (searchName === "cuisine") {
        response = await axios.post("http://localhost:3000/restaurant/getByCuisine", { cuisine: searchQuery }, {
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
        toast.error(response.data.msg || 'No restaurants found.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching restaurant:', error);
      toast.error('Error searching restaurant.');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchRestaurant();
    } else {
      toast.warning('Please enter a search query.');
    }
  };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <h1>Restaurants!</h1>
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
          {restaurant.map(restaurants => (

            <CardComponent key={restaurants._id} image={restaurants.image} title={restaurants.name} 
            subtitle={restaurants.description}  />
            
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;