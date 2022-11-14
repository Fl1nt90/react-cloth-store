import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import SignIn from "./routes/sign-in/sign-in.component";



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}> {/* will render persistent "Navigation" with base url */}
          <Route index element={<Home />} />  {/* "index" attribute will render "Home" by default */}
          <Route path="sign-in" element={<SignIn />} /> 
        </Route> 
      </Routes>
    </div>
  );
}

export default App;
