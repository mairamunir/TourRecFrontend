import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CardComp from './Card';
import { useNavigate } from 'react-router-dom';
const CityPage = () => {
  const [cities, setCities] = useState([]);
  const token = useSelector((state) => state.user.token);
const navigate = useNavigate();
  const fetchCities = async () => {
    try {
      const response = await axios.get("http://localhost:8000/city/getAll", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.data) {
        setCities(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div  style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#7AA59F', padding: '20px', textAlign: 'center' }}>
        <div>
          <button style={{ marginRight: '10px' }}>Hotels</button>
          <button style={{ marginRight: '10px' }}>Restaurants</button>
          <button style={{ marginRight: '10px' }} onClick ={()=>navigate('/transport')}>Transports</button>
          <button style={{ marginRight: '10px' }}>Activities</button>
          <button style={{ marginRight: '10px' }}>Landmarks</button>
          <button style={{ marginRight: '10px' }} onClick={()=>navigate('/user')}>User Page</button>
          <button>Guides</button>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <h1>Cities to Explore!</h1>
        <p>This is where you can choose the next city to explore.</p>

        {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {cities.map(city => (
            <CardComp key={city._id} city={city} /> */}
             <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cities.map(city => (
          <div key={city._id} style={{ width: '200px', margin: '10px' }}> {/* Set fixed width and margin */}
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
//         const response = await axios.get("http://localhost:8000/city/getAll", {
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


