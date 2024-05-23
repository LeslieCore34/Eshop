import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "../src/App.css";

export default function App() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      const scrolled = window.scrollY;

      // Check if the user has scrolled to the bottom of the page
      if (windowHeight + scrolled >= fullHeight) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main>
      <Navbar />
      <Outlet />
      {showFooter && <Footer />}
    </main>
  );
}
