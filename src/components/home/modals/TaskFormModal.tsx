import React from "react";
import {
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  DialogTitle,
  Dialog,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import { Priority, Status, Task } from "../../../types";

interface TaskFormModalProps {
  open: boolean;
  task: Task | null;
  onSubmit: (task: Omit<Task, "id" | "hash">) => void;
  onClose: () => void;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  open,
  task,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = React.useState({
    title: task?.title || "",
    priority: task?.priority || "MEDIUM",
    status: task?.status || "TODO",
    dateTime: task?.dateTime || new Date().toISOString().slice(0, 16),
    estimate: task?.estimate || 8,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
      >
        <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  sx={{ mt: 1 }}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={formData.priority}
                    label="Priority"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: e.target.value as Priority,
                      })
                    }
                  >
                    <MenuItem value="LOW">Low</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="HIGH">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as Status,
                      })
                    }
                  >
                    <MenuItem value="TODO">Todo</MenuItem>
                    <MenuItem value="DOING">Doing</MenuItem>
                    <MenuItem value="DONE">Done</MenuItem>
                    <MenuItem value="WARNING">Warning</MenuItem>
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="FAILED">Failed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Date/Time"
                  value={formData.dateTime}
                  onChange={(e) =>
                    setFormData({ ...formData, dateTime: e.target.value })
                  }
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Estimate (hours)"
                  value={formData.estimate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimate: Number(e.target.value),
                    })
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ mr: 1 }}
                >
                  {task ? "Update" : "Create"} Task
                </Button>
                <Button variant="outlined" onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
