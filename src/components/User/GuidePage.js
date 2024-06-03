import CardComponent from "./CardUniversal";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GuidePage = () => {
  const [guides, setGuides] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const fetchGuides = async () => {
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
  };

  useEffect(() => {
    if (searchName === "all") {
      fetchGuides();
    } else {
      searchGuide();
    }
  }, [searchName]);
  
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

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchGuide();
    } else {
      toast.warning('Please enter a search query.');
    }
  };

  return (
    <div>
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
            <CardComponent key={guide._id} image={guide.image} title={guide.name} 
            subtitle={guide.number} additionalInfo="email" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidePage;