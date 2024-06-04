 import * as React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CardComponent = ({ image, title, subtitle, additionalInfo, type, itemName, token, wishlistAdded, isAdmin, onDelete, itemId}) => {
const [expanded, setExpanded] = React.useState(false);
const [internalWishlistAdded, setInternalWishlistAdded] = React.useState(wishlistAdded);

  React.useEffect(() => {
    setInternalWishlistAdded(wishlistAdded);
  }, [wishlistAdded]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleWishlist = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      if (internalWishlistAdded ===true) {
        
        // Remove from wishlist
        const response = await axios.delete("http://localhost:3000/wishlist/deleteFromWishlist", {
          headers: headers,
          data:{
            type,
            itemName
          }
          
        }, {
        
      });
        if (response.status === 200) {
          setInternalWishlistAdded(false);
          console.log("Removed from wishlist:", response.data);
        } else {
          console.error("Failed to remove from wishlist");
        }
      } else if (internalWishlistAdded ===false) {
        // Add to wishlist
        const response = await axios.post("http://localhost:3000/wishlist/addToWishlist", {
          type,
          itemName
        }, {
          headers: headers
        });
        if (response.status === 200) {
          setInternalWishlistAdded(true);
          console.log("Added to wishlist:", response.data);
        } else {
          console.error("Failed to add to wishlist");
        }
      }
    } catch (error) {
      console.error("Error toggling wishlist", error);
    }
  };

const handleDelete= async()=>{
if (onDelete){
  onDelete(itemId);
}
};
  return (
    <Card sx={{ width: 250, height:350, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <CardMedia
            sx={{ height: 200}}
            image={image} 
            title={title}
          />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to wishlist" onClick={toggleWishlist} color={internalWishlistAdded ? "secondary" : "default"}>
          <FavoriteIcon />
        </IconButton>

        {isAdmin && (
        <IconButton onClick={handleDelete}>
        <DeleteIcon/>
        </IconButton>
        )}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
           {additionalInfo}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default CardComponent;
