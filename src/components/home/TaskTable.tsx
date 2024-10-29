import React, { useMemo, useState } from "react";
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

import { Priority, Status, Task } from "../../types";
import { formatEstimate, toPascalCase } from "../../utils";
import { FiltersSection } from "./FilterSection";

interface TaskTableProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onUpdateStatus: (task: Task) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
  onUpdateStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Task | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });
  const [filterPriority, setFilterPriority] = useState<Priority | "">("");
  const [filterStatus, setFilterStatus] = useState<Status | "">("");

  const handleSort = (key: keyof Task) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const sortedTasks = useMemo(() => {
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!filterPriority || task.priority === filterPriority) &&
        (!filterStatus || task.status === filterStatus)
    );

    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [tasks, searchTerm, filterPriority, filterStatus, sortConfig]);

  return (
    <>
      <FiltersSection
        searchTerm={searchTerm}
        filterPriority={filterPriority}
        filterStatus={filterStatus}
        onSearchChange={setSearchTerm}
        onPriorityChange={setFilterPriority}
        onStatusChange={setFilterStatus}
      />
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {["title", "priority", "dateTime", "estimate", "status"].map(
                (header, index) => (
                  <TableCell
                    key={index}
                    onClick={() => handleSort(header as keyof Task)}
                  >
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
            {sortedTasks.length ? (
              sortedTasks.map((task) => (
                <TableRow
                  key={task.id}
                  onClick={() => onUpdateStatus(task)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>
                    {new Date(task.dateTime).toLocaleString()}
                  </TableCell>
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  NO ITEMS
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
