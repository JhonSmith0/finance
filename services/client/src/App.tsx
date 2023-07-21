import axios from "axios";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";

const router = createBrowserRouter(routes);
axios.get(import.meta.env.VITE_API_URL).then((e) => {
  console.log(e.data);
});
function App() {
  return <RouterProvider router={router} />;
}

export default App;
