/* HotelPage.js */
import React, { useEffect, useState, useCallback} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardComponent from './CardUniversal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const HotelPage = () => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const token = useSelector((state) => state.user.token);
  const isAdmin = useSelector((state)=>state.user.roles.admin)
  const navigate = useNavigate();

  const isWishlistAdded = (activity) => {
    const wishlistAdded = wishlist.some(wishlistItem => wishlistItem.type === 'hotel' && wishlistItem.itemName === activity.branch);
    console.log('wishlistAdded:', wishlistAdded); // Log the value of wishlistAdded
    return wishlistAdded;
  };

  const fetchHotels = useCallback( async () => {
    try {
      const response = await axios.get("http://localhost:3000/hotel/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.data.data) {
        setHotels(response.data.data);
        setSearchResults(response.data.data);
      } else {
        toast.error(response.data.msg || 'Error fetching hotels');
      }

    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast.error('Error fetching cities.');

    }
  }, [token]);

  const fetchWishlist = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/wishlist/getWishlist", {  
      headers: {
          Authorization:`Bearer ${token}`,
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

  useEffect(() => {
    if (searchName === "all") {
      fetchHotels();
    } else {
      searchHotel();
    }
    fetchWishlist();
  }, [token, fetchHotels, fetchWishlist,searchName]);

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
        <h1>Hotels</h1>

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
            <option value="branch">By Branch</option>
            <option value="name">By Name</option>
          </select>

          <button style={{ marginLeft: '10px' }} onClick={handleSearch}>Search</button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px'}}>
          {hotels.map(hotel => (
            <CardComponent  key={hotel._id}
            image={hotel.image} 
            title={hotel.branch} 
            subtitle={`${hotel.city.name}, ${hotel.city.province}`} 
            additionalInfo="website/contact"
            type="hotel"
            itemName={hotel.branch}
            token={token}
            wishlistAdded={isWishlistAdded(hotel)}
            isAdmin={isAdmin}
           /> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelPage;

