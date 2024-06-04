import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card'; 
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ArrowBackIos } from '@mui/icons-material';

const getUserWishlist = async (token) => {
  try {
    const response = await axios.get("http://localhost:3000/wishlist/getWishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.data;
    } else {
      toast.error(response.data.message);
      return []; // Empty array in case of errors
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    toast.error('Error fetching wishlist.');
    return []; // Empty array in case of errors
  }
};

function Faves() {
  const [wishlist, setWishlist] = useState([]);
  const token = useSelector((state) => state.user.token);
  const userRole = useSelector((state) => state.user.role); 
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== 'user') {
      const fetchWishlist = async () => {
        const retrievedWishlist = await getUserWishlist(token);
        setWishlist(retrievedWishlist);
      };
      fetchWishlist();
    }
  }, [token, userRole]);

  if (userRole === 'admin' || userRole === 'superAdmin') {

    return (

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>

        <Typography variant="h4" fontWeight="bold" mb={2}>Wishlist</Typography>

        <Typography>Your wishlist does not exist.</Typography>
        
        <Button variant="contained" sx={{backgroundColor: '#7AA59F',
'&:hover': {
              backgroundColor: '#5e8c82'
            }}} onClick={() => navigate('/userpage')}>
          Back
        </Button>
        <ArrowBackIos onClick={()=>navigate('/adminPage')} sx={{cursor: 'pointer',float: "left" }}/>

      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Wishlist</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/userpage')} sx={{ mb: 2 }}>
        Back
      </Button>
      {wishlist.length === 0 ? (
        <Typography>Your wishlist is empty.</Typography>
      ) : (
        <>
          {wishlist.city && wishlist.city.length > 0 && (
            <>
              <Typography variant="h5">Cities</Typography>
              {wishlist.city.map((city) => (
                <Card key={city._id} sx={{ width: 250, height: 300, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {city.image && (
                    <CardMedia
                      component="img"
                      height={140}
                      image={city.image}
                      alt={city.name}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {city.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Country: {city.country}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Province: {city.province}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
          {wishlist.activity && wishlist.activity.length > 0 && (
            <>
              <Typography variant="h5">Activities</Typography>
              {wishlist.activity.map((activity) => (
                <Card key={activity._id} sx={{ width: 250, height: 300, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {activity.image && (
                    <CardMedia
                      component="img"
                      height={140}
                      image={activity.image}
                      alt={activity.type}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {activity.type}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
          {wishlist.hotel && wishlist.hotel.length > 0 && (
            <>
              <Typography variant="h5">Hotels</Typography>
              {wishlist.hotel.map((hotel) => (
                <Card key={hotel._id} sx={{ width: 250, height: 300, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {hotel.image && (
                    <CardMedia
                      component="img"
                      height={140}
                      image={hotel.image}
                      alt={hotel.name}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {hotel.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Branch: {hotel.branch}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
          {wishlist.restaurant && wishlist.restaurant.length > 0 && (
            <>
              <Typography variant="h5">Restaurants</Typography>
              {wishlist.restaurant.map((restaurant) => (
                <Card key={restaurant._id} sx={{ width: 250, height: 300, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {restaurant.image && (
                    <CardMedia
                      component="img"
                      height={140}
                      image={restaurant.image}
                      alt={restaurant.name}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {restaurant.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      City: {restaurant.city}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cuisine: {restaurant.cuisine}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
          {wishlist.landmark && wishlist.landmark.length > 0 && (
            <>
              <Typography variant="h5">Landmarks</Typography>
              {wishlist.landmark.map((landmark) => (
                <Card key={landmark._id} sx={{ width: 250, height: 300, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {landmark.image && (
                    <CardMedia
                      component="img"
                      height={140}
                      image={landmark.image}
                      alt={landmark.name}
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {landmark.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Type: {landmark.type}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
          {wishlist.guide && wishlist.guide.length > 0 && (
            <>
              <Typography variant="h5">Guides</Typography>
              {wishlist.guide.map((guide) => (
                <Card key={guide._id} sx={{ width: 250, height: 300, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {guide.image && (
                    <CardMedia
                      component="img"
                      height={140}
                      image={guide.image}
                      alt={guide.name}
                    />
                  )}
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Contact: {guide.contact}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email: {guide.email}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default Faves;