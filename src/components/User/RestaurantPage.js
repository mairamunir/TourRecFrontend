import React, { useEffect, useState, useCallback} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardComponent from './CardUniversal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box,Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

const RestaurantPage = () => {
  const [restaurant, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  const token = useSelector((state) => state.user.token);
  const isAdmin = useSelector((state)=>state.user.roles.admin);
  const navigate = useNavigate();

  const isWishlistAdded = (activity) => {
    const wishlistAdded = wishlist.some(wishlistItem => wishlistItem.type === 'restaurant' && wishlistItem.itemName === activity.name);
    console.log('wishlistAdded:', wishlistAdded); // Log the value of wishlistAdded
    return wishlistAdded;
  };

  const fetchRestaurants = useCallback( async () => {
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

  useEffect(() => {
    if (searchName === "all") {
      fetchRestaurants();
    } else {
      searchRestaurant();
    }
    fetchWishlist();
  }, [token, fetchRestaurants, fetchWishlist, searchName]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchRestaurant();
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

            <CardComponent 
            key={restaurants._id} 
            image={restaurants.image} 
            title={restaurants.name} 
            subtitle={restaurants.description}
            type="restaurant"
            itemName={restaurants.name}
            token={token}
            wishlistAdded={isWishlistAdded(restaurants)}
            isAdmin={isAdmin}
           />            
          ))}
        </div>
      </div>
    </div>
    </Box>
  );
};

export default RestaurantPage;

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import CardComponent from './CardUniversal';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Box,Typography } from "@mui/material";
// import { ArrowBackIos, RestartAlt } from "@mui/icons-material";

// const RestaurantPage = () => {
//   const [restaurant, setRestaurants] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchName, setSearchName] = useState("all");
//   const [searchResults, setSearchResults] = useState([]);
//   const token = useSelector((state) => state.user.token);
//   const isAdmin = useSelector((state)=>state.user.roles.admin)
//   const navigate = useNavigate();

  

//   useEffect(() => {
//     if (searchName === "all") {
//       fetchRestaurants();
//     } else {
//       searchRestaurant();
//     }
//   }, [searchName]);

//   const fetchRestaurants = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/restaurant/getAll", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (response.data.data) {
//         setRestaurants(response.data.data);
//         setSearchResults(response.data.data);
        

//       }
//       else{
//         toast.error(response.data.msg || 'Error fetching restaurants');
//       }
//     } catch (error) {
//       console.error('Error fetching Restaurants:', error);
//       toast.error("Error fetching restaurants.");
//     }
//   };

//   const searchRestaurant = async () => {
//     try {
//       let response;
//       if (searchName === "name") {
//         response = await axios.post("http://localhost:3000/restaurant/getByRestaurantName", { name: searchQuery }, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//       } else if(searchName==="city"){
//         response = await axios.post("http://localhost:3000/restaurant/getByCityName", { name: searchQuery }, {
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//       }
      
//       else if (searchName === "cuisine") {
//         response = await axios.post("http://localhost:3000/restaurant/getByCuisine", { cuisine: searchQuery }, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//       }
//       console.log('Response:', response);
//       if (response.data.data) {
//         // Check if response.data.data is an array or object
//         if (Array.isArray(response.data.data)) {
//           setSearchResults(response.data.data);
//         } else {
//           setSearchResults([response.data.data]);
//         }
//       } else {
//         toast.error(response.data.msg || 'No restaurants found.');
//         setSearchResults([]);
//       }
//     } catch (error) {
//       console.error('Error searching restaurant:', error);
//       toast.error('Error searching restaurant.');
//     }
//   };

//   const handleSearch = () => {
//     if (searchQuery.trim() !== "") {
//       searchRestaurant();
//     } else {
//       toast.warning('Please enter a search query.');
//     }
//   };

// //   const deleteRestaurant = async (name) =>{
// //     try {
// //       const RestaurantToDelete = restaurant.find(restaurant => restaurant.name === name);
// //       if (!RestaurantToDelete) {
// //           toast.error('Restaurant not found');
// //           return;
// //       }
// //       const userConfirmed = window.confirm(`Are you sure you want to remove this restaurant: ${name}?`);
// // if (!userConfirmed) {
// //   return;
// // }
// //       const ResId = RestaurantToDelete._id;
      
// //       const response = await axios.delete("http://localhost:3000/restaurant/deleteByName", {
// //           headers: {
// //               Authorization: `Bearer ${token}`
// //           },
// //           data: {
// //               name: name
// //           }
// //       });
// //       if (response.status === 200) {
// //           toast.success('Restaurant deleted successfully');
// //           setRestaurants(restaurant.filter(restaurant => restaurant._id !== ResId));
// //       } else {
// //           toast.error(response.data.msg || 'Error deleting Restaurant');
// //       }
// //   } catch (error) {
// //       console.error('Error deleting restaurant:', error);
// //       toast.error('Error deleting restaurant.');
// //   }
// // };
// // In RestaurantPage.js
// const deleteRestaurant = async (id) => {
//   try {
//     // Send the ID directly to the backend for deletion
//     const response = await axios.delete(`http://localhost:3000/restaurant/deleteByName/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     if (response.status === 200) {
//       toast.success('Restaurant deleted successfully');
//       setRestaurants(restaurant.filter(restaurant => restaurant._id !== id));
//     } else {
//       toast.error(response.data.msg || 'Error deleting Restaurant');
//     }
//   } catch (error) {
//     console.error('Error deleting restaurant:', error);
//     toast.error('Error deleting restaurant.');
//   }
// };


//   return (
// <Box>
   
//     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//     <ArrowBackIos onClick={()=>navigate('/userPage')} sx={{cursor: 'pointer',float: "left", marginTop:2, marginLeft:2, marginBottom: 2 }}/>
//     <Typography variant="body1" sx={{ marginLeft: 1 }}>Back to Home Page</Typography>
//     </Box>


//     <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <div style={{ padding: '20px' }}>
//         <h1>Restaurants!</h1>
//         <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px' }}>
//           <input
//             style={{ marginRight: '10px' }}
//             type="text"
//             placeholder="Search query"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />

//           <select style={{ marginRight: '10px' }} value={searchName} onChange={(e) => setSearchName(e.target.value)}>
//             <option value="all">All</option>
//             <option value="city">By City</option>
//             <option value="name">By Name</option>
//           </select>

//           <button style={{ marginLeft: '10px' }} onClick={handleSearch}>Search</button>
//         </div>


//         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//           {restaurant.map(restaurants => (

//             <CardComponent key={restaurants._id} image={restaurants.image} title={restaurants.name} 

//             subtitle={restaurants.cuisine} 

//             additionalInfo= "contact" 
//             isAdmin={isAdmin}
//             onDelete={deleteRestaurant}
//             />
            
//           ))}
//         </div>
//       </div>
//     </div>
//     </Box>
//   );
// };

// export default RestaurantPage;