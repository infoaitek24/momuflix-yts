import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import MovieContent from "./components/MovieContent";
import MovieRandomizer from "./components/MovieRandomizer";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" Component={MovieContent} />
          <Route path="/movie_randomizer" element={<MovieRandomizer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
