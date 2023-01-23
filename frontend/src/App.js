import './App.css';
import ReactDOM from "react-dom/client";
import SongsContainer from './containers/SongsContainer'
import SongContainer from './containers/SongContainer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SongsContainer />}/>
        <Route path="/view/:songTitle" element={<SongContainer/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
