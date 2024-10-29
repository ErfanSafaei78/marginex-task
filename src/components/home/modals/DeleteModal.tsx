import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Task } from "../../../types";

interface DeleteModalProps {
  open: boolean;
  selectedTask?: Task | null;
  onClose: () => void;
  onDeleteTask: (taskHash: Task["hash"]) => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  onDeleteTask,
}) => {
  const [hashInput, setHashInput] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Task</DialogTitle>
      <div style={{ padding: "20px" }}>
        <Typography>Please enter the task key to confirm deletion:</Typography>
        <TextField
          fullWidth
          label="Task Key"
          variant="outlined"
          margin="normal"
          value={hashInput}
          onChange={(e) => {
            setHashInput(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="error"
          type="submit"
          onClick={() => {
            setHashInput("");
            onDeleteTask(hashInput);
          }}
          sx={{ mt: 2, mr: 1 }}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </div>
    </Dialog>
  );
};
