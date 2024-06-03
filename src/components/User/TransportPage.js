
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import CardComponent from "./CardUniversal";
import { Box,Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

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
        <Box>

<Box sx={{ display: 'flex', alignItems: 'center' }}>
    <ArrowBackIos onClick={()=>navigate('/userPage')} sx={{cursor: 'pointer',float: "left", marginTop:2, marginLeft:2, marginBottom: 2 }}/>
    <Typography variant="body1" sx={{ marginLeft: 1 }}>Back to Home Page</Typography>
    </Box>

        <div  style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
             <CardComponent 
             key={transport._id}
             image={transport.image} 
             title={transport.name} 
             subtitle={transport.type}
             additionalInfo= {`Contact: ${transport.contact}`}
            />
          ))}
        </div>
            </div>
        </div>
        </Box>
    )
}
export default TransportPage;