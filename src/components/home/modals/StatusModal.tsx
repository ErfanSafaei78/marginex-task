import React from "react";
import {
  Dialog,
  DialogTitle,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Status, Task } from "../../../types";
import { STATUS } from "../../../constants";
import { toPascalCase } from "../../../utils";

interface StatusModalProps {
  open: boolean;
  selectedTask?: Task | null;
  onClose: () => void;
  onUpdateStatus: (taskId: Task['id'], newStatus: Status) => void;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  open,
  selectedTask,
  onClose,
  onUpdateStatus,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Update Status</DialogTitle>
    <FormControl sx={{ m: 2, minWidth: 200 }}>
      <InputLabel>Status</InputLabel>
      <Select
        value={selectedTask?.status || ""}
        label="Status"
        onChange={(e) => {
          if (selectedTask) {
            onUpdateStatus(selectedTask.id, e.target.value as Status);
          }
        }}
      >
        {STATUS.map((status, index) => (
          <MenuItem key={index} value={status}>
            {toPascalCase(status)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Dialog>
);
