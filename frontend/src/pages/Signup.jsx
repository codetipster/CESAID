import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import {
  EmailOutlined,
  LockOutlined,
  Person2Outlined,
} from "@mui/icons-material";
import Logo from "../assets/cesaid.jpg";
import { ColorRing } from "react-loader-spinner";
import BackgroundImage from "../assets/bgnight.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  // State hooks for form inputs
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the user data
    const userData = {
      username,
      email,
      password,
    };

    try {
      console.log(userData);
      // Send a POST request to your API endpoint
      const response = await axios.post(
        "https://yourapi.com/register",
        userData,
      );
      setLoading(false);
      // Handle success (you may want to navigate to a different page or show a success message)
      alert(response.data.message); // Or use a more sophisticated approach than alert
      navigate("/login");
    } catch (error) {
      // Handle errors (e.g., display error message)
      console.error("Registration error:", error);
      setLoading(false); // Stop loading on error
      alert(error.response.data.message); // Or use a more sophisticated approach than alert
    }
  };

  // Update state on input change
  const handleInputChange = (e, setter) => setter(e.target.value);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${BackgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay color
          zIndex: 1,
        },
      }}
    >
      {loading ? (
        <ColorRing />
      ) : (
        <Paper
          elevation={6}
          sx={{
            position: "relative",
            zIndex: 2,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#E1ECF4",
            alignItems: "center",
            justifyContent: "center",
            "& > *": {
              margin: "10px",
            },
          }}
        >
          <img
            src={Logo}
            alt="CESAID Portal Logo"
            style={{ maxWidth: "150px", height: "auto", borderRadius: "50%" }}
          />
          <Typography
            component="h1"
            variant="h5"
            sx={{ textAlign: "center", color: "#0F89FA" }}
          >
            CESAID Investment and Administrative Portal
          </Typography>
          <Typography
            component="p"
            variant="p"
            sx={{ mt: 3, color: "#011627" }}
          >
            Please Create your User Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%", maxWidth: "300px" }}
          >
            <TextField
              onChange={(e) => handleInputChange(e, setUsername)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="text"
              autoFocus
              InputProps={{
                startAdornment: <Person2Outlined sx={{ mr: 2 }} />,
              }}
            />
            <TextField
              onChange={(e) => handleInputChange(e, setEmail)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: <EmailOutlined sx={{ mr: 2 }} />,
              }}
            />

            <TextField
              onChange={(e) => handleInputChange(e, setPassword)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Set A Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                startAdornment: <LockOutlined sx={{ mr: 2 }} />,
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
            <Button fullWidth variant="text">
              Already have an account?
            </Button>
            <Button fullWidth variant="text" onClick={() => navigate("/login")}>
              Login
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Signup;
