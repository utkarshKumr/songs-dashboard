import './App.css';
import ReactDOM from "react-dom/client";
import SongsContainer from './containers/SongsContainer'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SongsContainer />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
