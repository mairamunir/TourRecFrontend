import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardComponent from './CardUniversal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ActivitiesPage = ({ onBack }) => {
  const [activities, setActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchName === "all") {
      fetchActivities();
    } else {
      searchActivity();
    }
  }, [searchName]);

  const fetchActivities = async () => {
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
  };

  const searchActivity = async () => {
    try {
      let response;
      if (searchName === "city") {
        response = await axios.post("http://localhost:3000/activity/getByCity", { city: searchQuery }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } /*else if (searchName === "name") {
        response = await axios.post("http://localhost:3000/city/getByCityName", { name: searchQuery }, {
          headers: {
            Authorization: Bearer ${token}
          }
        });
      }*/
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

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchActivity();
    } else {
      toast.warning('Please enter a search query.');
    }
  };

  return (
    <div>
    

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
           
           />
          )
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;

// import React, { useEffect, useState, useCallback} from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import CardComp from '../Card';

// const ActivitiesPage = ({ onBack }) => {
//   const [activities, setActivities] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [userEmail, setUserEmail] = useState(null);
//   const token = useSelector((state) => state.user.token);
 
//   useEffect(() => {
//     const fetchUserEmail = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/auth/getName", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUserEmail(response.data.email);
//       } catch (error) {
//         console.error("Error fetching user email", error);
//       }
//     };

//     fetchUserEmail();
//   }, [token]);

//   const fetchActivities =  useCallback( async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/activities/getAll", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });
//       console.log(response.data);
//       if (response.data.data) {
//         setActivities(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching activities:', error);
//     }
//   }, [token]);

//   const fetchWishlist = useCallback(async () => {
//     if (!userEmail) {
//       console.error("User email not found");
//       return;
//     }

//     try {
//       const response = await axios.get("http://localhost:3000/wishlist/getWishlist", {
//       params: { email: userEmail },  
//       headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });
//       if (response.data.data) {
//         setWishlist(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching wishlist:', error.response || error.message);
//     }
//   }, [token, userEmail]);

//   useEffect(() => {
//     fetchActivities();
//     if (userEmail) {
//       fetchWishlist();
//     }
//   }, [fetchActivities, fetchWishlist, userEmail]);

//   const isWishlistAdded = (activity) => {
//     const wishlistAdded = wishlist.some(wishlistItem => wishlistItem.type === 'activity' && wishlistItem.itemName === activity.type);
//     console.log('wishlistAdded:', wishlistAdded); // Log the value of wishlistAdded
//     return wishlistAdded;
//   };

//   return (
//     <div>
//       <div style={{ backgroundColor: '#7AA59F', padding: '20px', textAlign: 'center' }}>
//         <button onClick={onBack}>Back</button>
//         <h1>Activities</h1>
//       </div>

//       <div style={{ padding: '20px' }}>
//         <h1>Available Activities</h1>
//         <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px'}}>
//           {activities.map(activity => (
//             <CardComp  
//             key={activity._id}
//             image={activity.image} 
//             title={activity.type} 
//             subtitle={`activity.city ? ${activity.city.name} : 'No city info'`} 
//             additionalInfo="Additional activity information can go here."
//             type="activity"
//             itemName={activity.type}
//             token={token}
//             wishlistAdded={isWishlistAdded(activity)}
//            />
//           )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActivitiesPage;