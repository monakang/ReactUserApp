import {
  Button,
  TextField,
  Container,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";

import { useAuth } from "./AuthContext"; // Cleaned up import
import { useNavigate } from "react-router-dom";
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  //  Local state for form fields
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target; // name is "email" or "password"

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Simulate an API response
    // login({ name: "Admin", email: "admin@example.com" });

    try {
      // Call  context login (which likely handles the API & localStorage)
      await login(credentials);
      navigate("/user");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, elevation: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            required
            value={credentials.email}
            onChange={handleChange}
            error={!!error}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
            value={credentials.password}
            onChange={handleChange}
            error={!!error}
            helperText={error}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 3, py: 1.5 }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
