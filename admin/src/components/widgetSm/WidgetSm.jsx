import "./widgetSm.css";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios"

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([])
  useEffect(()=>{
  
    const getNewUsers = async()=>{
      try {
        
        const res = await axios.get("/api/users?new=true",{
          headers: {
              token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
        })
        setNewUsers(res.data)
      } catch (error) {
        console.log(error)
        
      }
    }
    getNewUsers()
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user)=>(

          <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.profilePic || "https://ural-region.net/upload/711fae05789795e0cc2204cf4d914acf.jpg"}
            alt=""
            className="widgetSmImg"
            />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>

          </div>
          <button className="widgetSmButton">
            <VisibilityIcon className="widgetSmIcon" />
            Display
          </button>
        </li> 
          ))}
      </ul>
    </div>
  );
}
