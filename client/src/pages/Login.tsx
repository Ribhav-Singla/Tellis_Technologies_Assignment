import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { TextField, Button, Container, Typography, Stack } from "@mui/material";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import { authState } from '../state/authState';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>();

  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('Login data:', data);

    try {
      const res = await API.post("/api/auth/login", data);
      localStorage.setItem("token", res.data.token);
      setAuth({ user: { token: res.data.token } });
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" mb={2}>Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Email"
          type="email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email"
            }
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
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
          margin="normal"
          autoComplete="current-password"
        />
        
        <Stack direction="row" spacing={2} mt={2}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/register")}
            fullWidth
          >
            Register
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Login;
