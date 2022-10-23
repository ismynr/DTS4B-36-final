import logo from './logo.svg';
import './App.css';

import { Box, ThemeProvider } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';

import Home from './containers/Home';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="detail-song/:songId" element={<Home />} />
          {/* <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/> */}
          <Route
            path="*"
            element={
              <Box sx={{
                display: 'flex', 
                margin: 10, 
                justifyContent: 'center',
                alignItems: 'center', 
                flexDirection: 'column',
              }}>
                <img
                  src="https://cdn3d.iconscout.com/3d/premium/thumb/404-error-4461124-3696774.png"
                  alt="404"
                />
                <p>You have reach the edge of universe</p>
                <Link to="/">Take me home!</Link>
              </Box>
            }
          />
        </Routes>
    </div>
  );
}

export default App;
