import './App.css';
import NavbarComponent from './components/appbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoriesListComponent from './components/storiesList';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StoriesListComponent />} />
          <Route path="/stories" element={<StoriesListComponent />} />
          <Route path="/add" element={<h1>Add Page</h1>} />
          <Route path="/stories/:id" element={<h1>Story Page</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
