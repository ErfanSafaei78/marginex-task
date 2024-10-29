import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import { Task } from "../../types";
import { formatEstimate, toPascalCase } from "../../utils";

interface TaskTableProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onUpdateStatus: (task: Task) => void;
  sortConfig: {
    key: keyof Task | null;
    direction: "asc" | "desc";
  };
  onSort: (key: keyof Task) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
  onUpdateStatus,
  sortConfig,
  onSort,
}) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          {["title", "priority", "dateTime", "estimate", "status"].map(
            (header, index) => (
              <TableCell key={index} onClick={() => onSort(header as keyof Task)}>
                {toPascalCase(header) + " "}
                {sortConfig.key === header &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableCell>
            )
          )}
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task) => (
          <TableRow
            key={task.id}
            onClick={() => onUpdateStatus(task)}
            sx={{ cursor: "pointer" }}
          >
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{new Date(task.dateTime).toLocaleString()}</TableCell>
            <TableCell>{formatEstimate(task.estimate)}</TableCell>
            <TableCell>{toPascalCase(task.status)}</TableCell>
            <TableCell>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onEditTask(task);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask(task);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
