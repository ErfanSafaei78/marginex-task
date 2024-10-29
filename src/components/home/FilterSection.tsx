import React from "react";
import {
  TextField,
  MenuItem,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { PRIORITY, STATUS } from "../../constants";
import { toPascalCase } from "../../utils";
import { Priority, Status } from "../../types";

interface FiltersSectionProps {
  searchTerm: string;
  filterPriority: string;
  filterStatus: string;
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: Priority | "") => void;
  onStatusChange: (value: Status | "") => void;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  searchTerm,
  filterPriority,
  filterStatus,
  onSearchChange,
  onPriorityChange,
  onStatusChange,
}) => (
  <Paper sx={{ p: 2, mb: 4 }}>
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <TextField
        label="Search Tasks"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={filterPriority}
          label="Priority"
          onChange={(e) => onPriorityChange(e.target.value as Priority | "")}
        >
          <MenuItem value="">All</MenuItem>
          {PRIORITY.map((priority, index) => (
            <MenuItem key={index} value={priority}>
              {toPascalCase(priority)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={filterStatus}
          label="Status"
          onChange={(e) => onStatusChange(e.target.value as Status | "")}
        >
          <MenuItem value="">All</MenuItem>
          {STATUS.map((status, index) => (
            <MenuItem key={index} value={status}>
              {toPascalCase(status)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  </Paper>
);