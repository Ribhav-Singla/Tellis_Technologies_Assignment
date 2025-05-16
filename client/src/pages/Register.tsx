import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { TextField, Button, Container, Typography, Stack } from "@mui/material";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await API.post("/api/auth/register", data);
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mb={2}>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          margin="normal"
          autoComplete="email"
        />
        <TextField
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          margin="normal"
          autoComplete="new-password"
        />
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/login")}
            fullWidth
          >
            Back to Login
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Register;
