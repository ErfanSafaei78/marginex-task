import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Container,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Task } from "../../types";
import { STATUS } from "../../constants";
import { formatEstimate, toPascalCase } from "../../utils";
import { useLoginContext } from "../../context/loginContext";

interface KanbanProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
  onUpdateStatus: (task: Task) => void;
}

export const Kanban: React.FC<KanbanProps> = ({
  tasks,
  onEditTask,
  onDeleteTask,
  onUpdateStatus,
}) => {
  const { isLogin } = useLoginContext();

  return (
    <Paper elevation={3}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          overflowX: "scroll",
          flexWrap: "nowrap",
          py: 3,
        }}
      >
        {STATUS.map((status, index) => (
          <Stack key={`status_${index}`} sx={{}}>
            <Paper
              elevation={3}
              sx={{
                width: 250,
                height: "80vh",
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                background: "#f7f7f7",
                overflowY: "scroll",
                flexWrap: "nowrap",
              }}
            >
              <Typography>{toPascalCase(status)}</Typography>
              {tasks
                .filter((task) => task.status === status)
                .map((task, index) => (
                  <Card
                    key={`${status}_${index}`}
                    sx={{
                      height: 250,
                      overflow: "visible",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                    }}
                    onClick={() => onUpdateStatus(task)}
                  >
                    <CardHeader
                      title={task.title}
                      subheader={task.dateTime}
                      titleTypographyProps={{
                        variant: "body2",
                        fontWeight: 700,
                      }}
                      subheaderTypographyProps={{
                        variant: "subtitle2",
                        fontWeight: 400,
                      }}
                    />
                    <CardContent
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Typography sx={{ fontSize: 12 }}>
                        Estimate Time: {formatEstimate(task.estimate)}
                      </Typography>
                      <Chip
                        label={`${task.priority} priority`}
                        color={
                          task.priority === "HIGH"
                            ? "error"
                            : task.priority === "MEDIUM"
                            ? "warning"
                            : "default"
                        }
                      />
                      {isLogin && (
                        <Typography sx={{ fontSize: 12 }}>
                          Hash key: {task.hash}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions>
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
                    </CardActions>
                  </Card>
                ))}
            </Paper>
          </Stack>
        ))}
      </Container>
    </Paper>
  );
};
