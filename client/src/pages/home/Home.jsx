import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useState, useEffect } from "react";
import axios from "axios"

const Home = ({type}) => {
  const [lists, setLists]= useState([])
  const [genre, setGenre] = useState(null)
  
  useEffect(() => {

    // const listid =(lists)=>{
    //   lists.map((list)=>{
    //       console.log(list._id)
    //     })
    // }
    const getRandomLists = async () => {
      try {

        const res = await axios.get(
          `/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODM3MDVlMzU0YmRjNzMzYjQxZmEyNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MjIwNjczMiwiZXhwIjoxNjcyNjM4NzMyfQ.QAqniTlBobOyylJPcspG6Bcz-knJ-EdeUUsHU1E2PcY",
            },
          }
        );
        setLists(res.data);
        // listid(lists)
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type,genre]); 

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre}/>
      {lists.map((list)=>(
        <List key = {list._id} list = {list}/>
      ))}
      
    </div>
  );
};

export default Home;
