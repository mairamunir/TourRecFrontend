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
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

const CardComponent = ({ image, title, subtitle, additionalInfo, type, itemName, userEmail}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [wishlistAdded, setWishlistAdded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleWishlist = async () => {
    try {
      if (wishlistAdded) {
        // Remove from wishlist
        const response = await axios.post("http://localhost:3000/wishlist/deleteFromWishlist", {
          email: userEmail,
          type: type,
          itemName: itemName
        });
        if (response.status === 200) {
          setWishlistAdded(false);
          console.log(response.data.message);
        }
      } else {
        // Add to wishlist
        const response = await axios.post("http://localhost:3000/wishlist/addToWishlist", {
          email: userEmail,
          type: type,
          itemName: itemName
        });
        if (response.status === 200) {
          setWishlistAdded(true);
          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error toggling wishlist", error);
    }
  };



  return (
    <Card sx={{ width: 250, height:300, margin: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        sx={{ height: 180}}
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
        <IconButton aria-label="add to wishlist" onClick={toggleWishlist} color={wishlistAdded ? "secondary" : "default"}>
          <FavoriteIcon />
        </IconButton>
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