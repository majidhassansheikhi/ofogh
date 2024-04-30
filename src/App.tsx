import { Routes, Route } from 'react-router-dom';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';

function App() {
  //const theme = createTheme(); // Create a theme

  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  
  );
}

export default App;