import { Routes, Route, Router, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';

function App() {
  //const theme = createTheme(); // Create a theme
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ]);
  
  return (
    
    <RouterProvider router={router} />
  
  );
}

export default App;