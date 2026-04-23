import {
  Button,
  Container,
  Paper,
  Typography,
  Box,
  Alert, // Added for better error UX
  CircularProgress, // Added for loading state
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { FormInput } from "./common/FormInput";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //client-side validation
    if (!credentials.email || !credentials.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await login(credentials);
      navigate("/user");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
          Login
        </Typography>

        {/* General error message display */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={credentials.email}
            onChange={handleChange}
            error={!!error}
            helperText={error.toLowerCase().includes("email") ? error : ""}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            error={!!error}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading} // Prevent double submissions
            sx={{ mt: 3, py: 1.5, textTransform: "none", fontSize: "1rem" }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
