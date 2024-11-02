import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { Task } from "../../../types";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (taskHash: Task["hash"]) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onLogin,
}) => {
  const [password, setPassword] = useState("");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <div style={{ padding: "20px" }}>
        <Typography>Please enter the password to login:</Typography>
        <TextField
          type="password"
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          onClick={() => {
            setPassword("");
            onLogin(password);
            onClose();
          }}
          sx={{ mt: 2, mr: 1 }}
        >
          Login
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
