import { Snackbar, Alert } from "@mui/material";
import { createContext, useContext, useState } from "react";

type Severity = "success" | "error" | "warning" | "info";

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: Severity) => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<Severity>("success");

  const showSnackbar = (message: string, severity: Severity = "success") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={severity}
          variant="filled"
          onClose={() => setOpen(false)}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within SnackbarProvider");
  }

  return context;
};
