import "./VideoCart.css";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import img from "../../assets/card-bg.png";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import TextVideo from "../../assets/TextVideo.mp4";

export default function VideoCart() {
  return (
    <div className="VideoCartContainer">
      <Card sx={{ maxWidth: 435, margin: 5 }}>
        <CardMedia
          sx={{ widows: "100%" }}
          component="video"
          src={TextVideo} // Replace with your video URL
          controls
          autoPlay
          loop
          //  image={img}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Speckyfox Saminar 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <FavoriteBorderOutlinedIcon />
          </Button>
          <Button size="medium">
            <ShareOutlinedIcon />
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 435, margin: 5 }}>
        <CardMedia
          sx={{ widows: "100%" }}
          component="video"
          src={TextVideo} // Replace with your video URL
          controls
          autoPlay
          loop
          //  image={img}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Speckyfox Saminar 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <FavoriteBorderOutlinedIcon />
          </Button>
          <Button size="medium">
            <ShareOutlinedIcon />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
