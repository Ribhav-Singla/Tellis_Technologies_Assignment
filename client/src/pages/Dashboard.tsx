import { useEffect, useState } from "react";
import API from "../services/api";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Box,
  Typography,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  description: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get("/api/tasks");
    setTasks(res.data);
  };

  const deleteTask = async (id: string) => {
    await API.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="contained" onClick={() => navigate("/add-task")}>
          Add Task
        </Button>
      </Box>
      {tasks.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No tasks found. Please add some.
        </Typography>
      ) : (
        <List>
          {tasks.map((task, index) => (
            <Box key={task._id}>
              <ListItem
                sx={{
                  bgcolor: "background.paper",
                  mb: 1,
                  borderRadius: 1,
                  boxShadow: 1,
                }}
                secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/edit-task/${task._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => deleteTask(task._id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="h6" component="span">
                      {task.title}
                    </Typography>
                  }
                  secondary={task.description}
                />
              </ListItem>
              {index < tasks.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Dashboard;
