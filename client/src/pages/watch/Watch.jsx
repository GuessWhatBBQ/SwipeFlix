import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom';
import "./watch.scss";

export default function Watch() {
  const location = useLocation()
  console.log(location)
  const movie = location.state.movie 
  return (
    <div className="watch">
      <Link to="/">
      <div className="back">
        <ArrowBackIcon />
        Home
      </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress="true"
        controls
        src= {movie.video}
      />
    </div>
  );
}
