import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

export const AppBarComponent: React.FC<{ onAddTask: () => void }> = ({
  onAddTask,
}) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Task Manager
      </Typography>
      <Typography variant="subtitle1" sx={{ mr: 2 }}>
        {new Date().toLocaleString()}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={onAddTask}
      >
        Add Task
      </Button>
    </Toolbar>
  </AppBar>
);
