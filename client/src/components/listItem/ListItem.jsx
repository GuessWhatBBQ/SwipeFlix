import "./listItem.scss";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {Link} from 'react-router-dom';

import { useEffect, useState } from "react";
import axios from "axios";

export default function ListItem({ index,item }) {
  const [isHovered, setIsHovered] = useState(false);

  const [movie, setMovie] = useState({});
  useEffect(()=>{
    const getMovie = async()=>{
      try {
        const res = await axios.get("/api/movies/find/"+item, {
            headers: {
              token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODM3MDVlMzU0YmRjNzMzYjQxZmEyNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTA1OTM3NiwiZXhwIjoxNjcxNDkxMzc2fQ.SjS6yUnxLzMWHcCJGwqCtLgY9l6VzjZY9NJ051HOjP0",
            },
          })
          setMovie (res.data)
         
      } catch (error) {
        console.log(error)
      }
    }
    getMovie()
  },[item])
  
  return (
    <Link to ="/watch" state={{movie:movie}}>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
      <img
        src={movie.img}
        alt=""
        />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrowIcon className="icon" />
              <AddIcon className="icon" />
              <ThumbUpIcon className="icon" />
              <ThumbDownIcon className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
            {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
      </Link>
  );
}
