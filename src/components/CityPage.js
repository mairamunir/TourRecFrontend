import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardComp from './Card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CityPage = () => {
  const [cities, setCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("all");
  const [searchResults, setSearchResults] = useState([]);

  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchName === "all") {
      fetchCities();
    } else {
      searchCity();
    }
  }, [searchName]);

  const fetchCities = async () => {
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
  };

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
        toast.error(response.data.msg || 'No city found.');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching city:', error);
      toast.error('Error searching city.');
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchCity();
    } else {
      toast.warning('Please enter a search query.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#7AA59F', padding: '20px', textAlign: 'center' }}>
        <div>
          <button style={{ marginRight: '10px' }}>Hotels</button>
          <button style={{ marginRight: '10px' }}>Restaurants</button>
          <button style={{ marginRight: '10px' }} onClick={() => navigate('/transport')}>Transports</button>
          <button style={{ marginRight: '10px' }}>Activities</button>
          <button style={{ marginRight: '10px' }}>Landmarks</button>
          <button style={{ marginRight: '10px' }} onClick={() => navigate('/user')}>User Page</button>
          <button>Guides</button>
        </div>
      </div>

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
            <div key={city._id} style={{ width: '250px', margin: '10px' }}>
              <CardComp city={city} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityPage;


// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import CardComp from './Card';

// const CityPage = () => {
//     const [cities, setCities] = useState([]);
//     const token = useSelector((state) => state.user.token);
  
//     const fetchCities = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/city/getAll", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         if (response.data.data) {
//           setCities(response.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching cities:', error);
//       }
//     };
  
//     useEffect(() => {
//       fetchCities();
//     }, []);  

//     return (
//         <div>
//             <div style={{ backgroundColor: '#7AA59F', padding: '20px', textAlign: 'center' }}>
//               <div>
//                 <button style={{ marginRight: '10px' }}>Hotels</button>
//                 <button style={{ marginRight: '10px' }}>Restaurants</button>
//                 <button style={{ marginRight: '10px' }}>Transports</button>
//                 <button style={{ marginRight: '10px' }}>Activities</button>
//                 <button style={{ marginRight: '10px' }}>Landmarks</button>
//                 <button>Guides</button>
//               </div>
//             </div>
    
//             <div style={{ padding: '20px' }}>
//               <h1>Top Cities To Explore In Pakistan!</h1>
//               <p>This is where you can choose the next city you want to explore.</p>
    
//               <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                 {cities.map(city => (
//                   <CardComp key={city._id} city={city} />
//                 ))}
//               </div>
//             </div>
//         </div>
//     );
// }

// export default CityPage;


