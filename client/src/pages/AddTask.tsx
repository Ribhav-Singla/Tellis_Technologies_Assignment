import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { TextField, Button, Container, Typography, Box, Stack } from "@mui/material";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

interface TaskForm {
  title: string;
  description: string;
}

const AddTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskForm>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TaskForm> = async (data) => {
    try {
      await API.post("/api/tasks", data);
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" mb={3}>Add Task</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              fullWidth
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
              variant="outlined"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              {...register("description", { required: "Description is required" })}
              error={!!errors.description}
              helperText={errors.description?.message}
              variant="outlined"
            />
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => reset()}
              >
                Reset
              </Button>
              <Button
                variant="text"
                color="inherit"
                fullWidth
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default AddTask;
