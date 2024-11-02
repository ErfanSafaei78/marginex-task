import { Container, Paper } from "@mui/material";
import { AppBarComponent } from "../components/home/AppBar";
import { PieChart, PieChartProps } from "../components/global/PieChart";
// import { TaskTable } from "../components/home/TaskTable";
import { TaskFormModal } from "../components/home/modals/TaskFormModal";
import { StatusModal } from "../components/home/modals/StatusModal";
import { DeleteModal } from "../components/home/modals/DeleteModal";
import { useEffect, useState } from "react";
import { Status, Task } from "../types";
import { generateHash } from "../utils";
import { SnackbarAlert } from "../components/global/SnackBar";
import { Kanban } from "../components/home/Kanban";

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState<{
    message: string;
    severity: "error" | "success";
  }>({
    message: "Unknown Error!",
    severity: "error",
  });

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // handlers
  const handleAddTask = (taskData: Omit<Task, "id" | "hash">) => {
    const newTask: Task = {
      ...taskData,
      id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
      hash: generateHash(),
    };
    setTasks([...tasks, newTask]);
    setOpenModal(false);
    setSnackbarConfig({
      message: "Task successfully added! Task key: " + newTask?.hash,
      severity: "success",
    });
    setOpenSnackbar(true);
  };

  const handleUpdateTask = (taskData: Omit<Task, "id" | "hash">) => {
    if (!selectedTask) return;

    setTasks(
      tasks.map((task) =>
        task.id === selectedTask.id ? { ...task, ...taskData } : task
      )
    );
    setOpenModal(false);
    setSnackbarConfig({
      message: "Task successfully updated! Task key: " + selectedTask?.hash,
      severity: "success",
    });
    setSelectedTask(null);
    setOpenSnackbar(true);
  };

  const handleUpdateStatus = (taskId: Task["id"], newStatus: Status) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    setOpenStatusDialog(false);
    setSelectedTask(null);
    setSnackbarConfig({
      message: "Task status successfully updated!",
      severity: "success",
    });
    setOpenSnackbar(true);
  };

  const handleDeleteTask = (hash: Task["hash"]) => {
    try {
      if (!selectedTask) {
        throw new Error("Task not found!");
      }
      if (selectedTask.hash === hash) {
        setTasks(tasks.filter((task) => task.hash !== selectedTask.hash));
        setOpenDeleteDialog(false);
        setSelectedTask(null);
        setSnackbarConfig({
          message: "Task deleted successfully!",
          severity: "success",
        });
        setOpenSnackbar(true);
      } else {
        throw new Error("Invalid task key!");
      }
    } catch (error) {
      setSnackbarConfig({
        message: error instanceof Error ? error.message : "Unknown Error!",
        severity: "error",
      });
      setOpenSnackbar(true);
    }
  };

  const chartProps: PieChartProps = {
    data: [
      ["TODO", tasks.filter((t) => t.status === "TODO").length],
      ["DOING", tasks.filter((t) => t.status === "DOING").length],
      ["DONE", tasks.filter((t) => t.status === "DONE").length],
      ["WARNING", tasks.filter((t) => t.status === "WARNING").length],
      ["PENDING", tasks.filter((t) => t.status === "PENDING").length],
      ["FAILED", tasks.filter((t) => t.status === "FAILED").length],
    ],
    title: `Status<br/>${new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}`,
    name: "Tasks",
    halfPie: true,
  };

  return (
    <>
      <AppBarComponent onAddTask={() => setOpenModal(true)} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 2, mb: 4 }}>
          <PieChart {...chartProps} />
        </Paper>
        <Kanban
          tasks={tasks}
          onEditTask={(task) => {
            setSelectedTask(task);
            setOpenModal(true);
          }}
          onDeleteTask={(task) => {
            setSelectedTask(task);
            setOpenDeleteDialog(true);
          }}
          onUpdateStatus={(task) => {
            setSelectedTask(task);
            setOpenStatusDialog(true);
          }}
        />
        <TaskFormModal
          open={openModal}
          task={selectedTask}
          onSubmit={selectedTask ? handleUpdateTask : handleAddTask}
          onClose={() => {
            setOpenModal(false);
            setSelectedTask(null);
          }}
        />
        <StatusModal
          open={openStatusDialog}
          selectedTask={selectedTask}
          onClose={() => {
            setOpenStatusDialog(false);
            setSelectedTask(null);
          }}
          onUpdateStatus={handleUpdateStatus}
        />
        <DeleteModal
          open={openDeleteDialog}
          selectedTask={selectedTask}
          onClose={() => {
            setOpenDeleteDialog(false);
            setSelectedTask(null);
          }}
          onDeleteTask={handleDeleteTask}
        />
        <SnackbarAlert
          open={openSnackbar}
          message={snackbarConfig.message}
          severity={snackbarConfig.severity}
          onClose={() => setOpenSnackbar(false)}
        />
      </Container>
    </>
  );
};
