import "./app.scss"
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const App = () => {
  const user = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user? <Home />:  <Navigate to="/register"/>} />

        <Route exact path="/register" element={!user?<Register />:<Navigate to ="/"/>} />

        <Route exact path="/login" element={!user?<Login />:<Navigate to="/"/>} />
        {
          user &&(
            <>

            <Route path="/movies" element={<Home type="movies"/>} />
        <Route path="/series" element={<Home type="series"/>} />

        <Route path="/watch" element={<Watch/>} />
            </>
          )}
       

      </Routes>
    </BrowserRouter>
  );
};

export default App;