import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import './index.css'
import Home from './components/Home.jsx';
import Pastes from './components/Pastes.jsx';
import Navbar from './components/Navbar.jsx';
import Viewpaste from './components/Viewpaste';
const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div>
        <Navbar/>
        <Pastes/>
      </div>
    },
    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar/>
        <Viewpaste/>
      </div>
    },
  ]
);
export default function App() {
  return (
    <div className=''>
    <RouterProvider router={router}/>
    </div>
  )
}