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
    const getRandomLists = async () => {
      try {

        console.log("data")
        const res = await axios.get(
          `/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODM3MDVlMzU0YmRjNzMzYjQxZmEyNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2OTU2NDc2NCwiZXhwIjoxNjY5OTk2NzY0fQ.wKDf_tyBj_ZeguaslaMQgRKNgBAgN52ub1-zRTkTdH4",
            },
          }
        );
        setLists(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type,genre]); 

  return (
    <div className="home">
      <Navbar />
      <Featured type={type}/>
      <List/>
      <List/>
      <List/>
      <List/>
    </div>
  );
};

export default Home;
