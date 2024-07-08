import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const loadTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/tasks");
      if (res.ok) {
        const { data } = await res.json();
        setTasks(data);
      } else {
        console.error("Failed to fetch tasks:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Task List</h1>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Card
            key={task.id || task._id}
            style={{
              marginBottom: ".7rem",
              backgroundColor: "#1e272e",
            }}
          >
            <CardContent
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Typography variant="h6" color="#fff">
                  {task.title}
                </Typography>
                <Typography variant="body2" color="#fff">
                  {task.description}
                </Typography>
              </div>

              <div>
                <ButtonGroup
                  style={{
                    marginTop: "1rem",
                    marginBottom: ".3rem",
                  }}
                >
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                      navigate(`/tasks/${task.id}/edit`)
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      handleDelete(task.id);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2">No tasks found.</Typography>
      )}
    </>
  );
}
