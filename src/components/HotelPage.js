/* HotelPage.js */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardComponent from './CardUniversal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HotelPage = ({ onBack }) => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      const response = await axios.post("http://localhost:3000/hotel/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.data.data) {
        setHotels(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  useEffect(() => {
    if (searchName === "all") {
      fetchHotels();
    } else {
      searchHotel();
    }
  }, [searchName]);

  const searchHotel = async () => {
    try {
      let response;
      if (searchName === "branch") {
        response = await axios.post("http://localhost:3000/hotel/getByBranchName", { name: searchQuery }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }else if (searchName === "company") {
        response = await axios.post("http://localhost:3000/hotel/getByCompanyName", { name: searchQuery }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } 
      else if (searchName === "city") {
        response = await axios.post("http://localhost:3000/hotel/getByCityName", { name: searchQuery }, {
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
        toast.error(response.data.msg || 'No hotel found.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching hotel:', error);
      toast.error('Error searching hotel.');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchHotel();
    } else {
      toast.warning('Please enter a search query.');
    }
  };

  return (
    <div>
    
      <div style={{ padding: '20px' }}>
        <h1>Available Hotels</h1>

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

        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px'}}>
          {hotels.map(hotel => (
            <CardComponent  key={hotel._id}
            image={hotel.image} 
            title={hotel.branch} 
            subtitle={`${hotel.city.name}, ${hotel.city}`} 
            additionalInfo="Additional hotel information can go here."
           /> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelPage;