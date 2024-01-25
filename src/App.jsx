import './All.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import Navbar from './Navbar';
import Calculator from './pages/Calculator';
import NotFound from './pages/NotFound';
import Todo from './pages/Todo';

const FullPage = () =>{
  return(
    <div className='main'>
      <h1>Week 5 tasks</h1>
      <Navbar />
      <hr />
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <FullPage/>,
    children:[{
      path: "/",
      element: <Calculator />,
    },],
  },
  {
    path: "/calculator",
    element: <FullPage/>,
    children:[{
      path: "/calculator",
      element: <Calculator />,
    },],
  },
  {
    path: "/todo",
    element: <FullPage/>,
    children:[{
      path: "/todo",
      element: <Todo />,
    },],
  },
  {
    path: "*",
    element: <NotFound/>,
  },
]);

function App() {
  return (
    <div className="App main">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;