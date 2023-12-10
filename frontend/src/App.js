import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // eslint-disable-next-line no-unused-vars
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoadingOverlay from "./components/LoadingOverlay"; // If you're using a loading overlay
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import DataProvider from "./providers/DataProvider";

async function fakeAuthCheck() {
  // Return a promise that resolves after a delay
  // In a real app, replace this with your actual authentication check
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return false;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const sessionIsValid = await fakeAuthCheck();
      setIsAuthenticated(sessionIsValid);
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <DataProvider>
        <Router>
          <Routes>
            {/* {isAuthenticated ? (
        <Route path="/" exact element={<Home />} />
       ):(
        <Route path="/*" element={<Navigate to="/login" />} />
       )} */}
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/" exact element={<Home />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
