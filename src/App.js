import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import NotFound from './Components/NotFound/NotFound'
import Cart from "./Components/Cart/Cart";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Checkout from './Components/Checkout/Checkout'
import ProductDetails from "./Components/ProductDetails/ProductDetails";

function App() {

  //Routing
  const routers = createBrowserRouter([
    {
      path: '/', element: <Layout />, children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <Contact /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> }, //Protected Router
        { path: "productdetails/:productId", element: <ProductDetails /> }, //Product ID Router
        { path: "checkout", element: <ProtectedRoute> <Checkout /> </ProtectedRoute> }, //Protected Router
        { path: "*", element: <NotFound /> }
      ]
    }
  ]);

  return <>
    <Provider store={store}>
      <RouterProvider router={routers}>

      </RouterProvider>
    </Provider>
  </>
}

export default App;
