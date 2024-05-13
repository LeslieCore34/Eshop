import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "../src/App.css";

export default function App() {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
