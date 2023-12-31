import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import Logo from "../assets/cesaid.jpg";
import { ColorRing } from "react-loader-spinner";
import BackgroundImage from "../assets/bgimage.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading

    // Prepare the user data
    const loginData = {
      email,
      password,
    };

    try {
      console.log(loginData);
      // Send a POST request to your API endpoint
      const response = await axios.post(
        "https://yourapi.com/register",
        loginData,
      );

      setLoading(false); // Stop loading on success
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      // Handle errors (e.g., display error message)
      setLoading(false); // Stop loading on error
      console.error("Login error:", error);
      alert(error.response.data.message); // Or use a more sophisticated approach than alert
    }
  };

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
        <ColorRing /> // Display loader when loading
      ) : (
        <Paper
          elevation={6}
          sx={{
            position: "relative",
            zIndex: 2,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#F6F7F8",
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
            Please Login to Continue
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%", maxWidth: "300px" }}
          >
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
              label="Password"
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
              Sign In
            </Button>
            <Button fullWidth variant="text">
              Forgot your password?
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => navigate("/signup")}
            >
              Create account
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Login;
