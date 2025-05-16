import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Stack
} from "@mui/material";

interface TaskForm {
  title: string;
  description: string;
}

const EditTask = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TaskForm>();

  // Track if data has been fetched and form reset
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/api/tasks/${id}`);
        reset(res.data);
        setIsLoaded(true);
      } catch (error) {
        alert("Failed to load task data");
      }
    };
    fetchTask();
  }, [id, reset]);

  const onSubmit: SubmitHandler<TaskForm> = async (data) => {
    try {
      await API.put(`/api/tasks/${id}`, data);
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to update task");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" mb={3}>Edit Task</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              label={isLoaded ? "" : "Title"}
              fullWidth
              variant="outlined"
              {...register("title", { required: "Title is required" })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              label={isLoaded ? "" : "Description"}
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              {...register("description", { required: "Description is required" })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Update
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

export default EditTask;
