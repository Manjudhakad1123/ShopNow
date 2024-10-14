import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { useEffect } from "react";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
