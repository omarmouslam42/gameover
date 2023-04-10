
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import Category from './components/category/Category'
import GamesDetails from './components/gameDetails/GamesDetails'
import Games from './components/Games/Games'
import Home from './components/Home/Home'
import LayOut from './components/LayOut/LayOut'
import SortBy from "./components/sortBy/SortBy";
import Reg from "./components/Regester/Reg";
import Login from "./components/Login/Login";
import Platform from "./components/platform/Platform";

function App() {

  function ProtectRoute(props) {
    if (localStorage.getItem("token") === null) {
      //m3ml4 login
      return<Navigate to='/login'/>}
      else{
        return <>{props.children}</>
      }
  }

  const router = createBrowserRouter([
    {path:"/", element: <LayOut />,children:[
      {path: "", element: <Login />},
      {path:'Reg',element:<Reg />},
      {path:'Home',element:<ProtectRoute><Home /></ProtectRoute>},
      {path:'login',element:<Login />},
      {path:'Games',element: <ProtectRoute><Games /></ProtectRoute>},
      {path:'platform',element:<ProtectRoute><Platform /></ProtectRoute>,children:[
        {path:":pf"}
      ]},
      {path:'sort-by',element:<ProtectRoute><SortBy /></ProtectRoute>,children:[
        {path:":sb"}
      ]},
      {path:'category',element:<ProtectRoute><Category /></ProtectRoute>,children:[
        {path:":categ"}
      ]},
      {path:'GamesDetails',element:<ProtectRoute><GamesDetails /></ProtectRoute>,children:[
        {path:":id"}
    ]},  
    ]},
    {path: "*", element: <div className="container p-5 m-auto d-flex justify-content-center align-items-center"><h2 className="text-white  mt-5 fs-1">4 0 4</h2>
    </div>}
  ])

  return <>
    <RouterProvider router={router}/>
  </>
}
export default App;


