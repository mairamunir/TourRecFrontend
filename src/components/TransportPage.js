// import { useNavigate } from "react-router-dom";
// import { useState,useEffect } from "react";
// import { useSelector } from "react-redux";
// import TransportCard from "./TransportCard";
// import axios from "axios";

// const TransportPage =() =>{
//     const navigate = useNavigate();

//     const [transports, setTransports] = useState([]);
//     const token = useSelector((state) => state.user.token);
 
//     const fetchTransports = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/transport/getAll", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         if (response.data.data) {
//           setTransports(response.data.data);
//           console.log("transport fetched");
//         }
//       } catch (error) {
//         console.error('Error fetching transport details:', error);
//       }
//     };
  
//     useEffect(() => {
//       fetchTransports();
//     }, []);

//     return(
//         <div  style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       <div style={{ backgroundColor: '#7AA59F', padding: '20px', textAlign: 'center' }}>
//         <div>
//           <button style={{ marginRight: '10px' }}>Hotels</button>
//           <button style={{ marginRight: '10px' }}>Restaurants</button>
//           <button style={{ marginRight: '10px' }} onClick={()=>navigate('/city')}>Cities</button>
//           <button style={{ marginRight: '10px' }}>Activities</button>
//           <button style={{ marginRight: '10px' }}>Landmarks</button>
//           <button style={{ marginRight: '10px' }} onClick={()=>navigate('/user')}>User Page</button>
//           <button>Guides</button>
//         </div>
//       </div>
      
//         <div style={{ padding: '20px' }}>
//         <h1>Transport!</h1>
//         <p>This is where you can find transport to your next adventure.</p>
//              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//         {transports.map(transport => (
//           <div key={transport._id} style={{ width: '250px', margin: '10px' }}> {/* Set fixed width and margin */}
//             <TransportCard transport={transport} />
//           </div>
//           ))}
//         </div>
//       </div>
//     </div>

//     )
// }
// export default TransportPage;


import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import TransportCard from "./TransportCard";
import axios from "axios";
import { toast } from "react-toastify";

const TransportPage =() =>{
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("all");
    const [searchResults, setSearchResults] = useState([]);
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        if (searchType === "all") {
            fetchTransports();
        } else {
            searchTransport();
        }
    }, [searchType]);

    const fetchTransports = async () => {
        try {
            const response = await axios.get("http://localhost:3000/transport/getAll", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.data) {
                setSearchResults(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching transport details:', error);
            toast.error('Error fetching transport details.')
        }
    };

    const searchTransport = async () => {
        try {
            let response;
            if (searchType === "city") {
                response = await axios.post("http://localhost:3000/transport/getByCity", { city: searchQuery }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else if (searchType === "type") {
                response = await axios.post("http://localhost:3000/transport/getByType", { type: searchQuery }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
            if (response.data.data && response.data.data.length>0) {
                setSearchResults(response.data.data);
            }
            else{
                toast.error('No transport found.');
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching transport:', error);
            toast.error('Error searching transport.')
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            if (searchType === "all") {
                fetchTransports();
            } else {
                searchTransport();
            }
        } else {
            toast.warning('Please enter a search query.');
        }
    };

    return(
        <div  style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: '#7AA59F', padding: '20px', textAlign: 'center' }}>
        <div>
          <button style={{ marginRight: '10px' }}>Hotels</button>
          <button style={{ marginRight: '10px' }}>Restaurants</button>
          <button style={{ marginRight: '10px' }} onClick={()=>navigate('/city')}>Cities</button>
          <button style={{ marginRight: '10px' }}>Activities</button>
          <button style={{ marginRight: '10px' }}>Landmarks</button>
          <button style={{ marginRight: '10px' }} onClick={()=>navigate('/user')}>User Page</button>
          <button>Guides</button>
        </div>
      </div>
      
        <div style={{ padding: '20px' }}>
        <h1>Transport!</h1>
        <p>This is where you can find transport to your next adventure.</p>

        
        <div style={{ display: 'flex', flexWrap: 'wrap', padding:'20px'}} >
                    <input
                        style={{ marginRight: '10px' }}
                        type="text"
                        placeholder="Search query"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                   
                    <select   style={{ marginRight: '10px' }} value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                        <option value="all">All</option>
                        <option value="city">By City</option>
                        <option value="type">By Type</option>
                    </select>
                     
                    <button style={{ marginLeft: '10px'}} onClick={handleSearch}>Search</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {searchResults.map(transport => (
                        <div key={transport._id} style={{ width: '250px',margin: '10px' }}>
                            <TransportCard transport={transport} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default TransportPage;