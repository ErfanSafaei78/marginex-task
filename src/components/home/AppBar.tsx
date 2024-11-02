import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import {
  Add as AddIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useLoginContext } from "../../context/loginContext";
import { LoginModal } from "./modals/LoginModal";

export const AppBarComponent: React.FC<{ onAddTask: () => void }> = ({
  onAddTask,
}) => {
  const { isLogin, login, logout } = useLoginContext();

  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
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
            startIcon={isLogin ? <LogoutIcon /> : <LoginIcon />}
            onClick={() => (isLogin ? logout() : setShowLoginModal(true))}
            sx={{ mr: 2 }}
          >
            {isLogin ? "Logout" : "Login"}
          </Button>
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
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={login}
      />
    </>
  );
};
