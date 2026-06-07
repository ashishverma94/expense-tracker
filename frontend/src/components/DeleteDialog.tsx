import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function DeleteDialog({
  open,
  onClose,
  onConfirm,
  title,
  isDark,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isDark: boolean;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          background: isDark ? "#141414" : "#fff",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        },
      }}
    >
      <DialogTitle
        sx={{ fontWeight: 700, color: isDark ? "#f9fafb" : "#111827" }}
      >
        Delete Expense
      </DialogTitle>
      <DialogContent>
        <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Are you sure you want to delete{" "}
          <strong className={isDark ? "text-gray-100" : "text-gray-900"}>
            "{title}"
          </strong>
          ? This cannot be undone.
        </p>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            color: isDark ? "#6b7280" : "#9ca3af",
            borderRadius: "10px",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            background: "#ef4444",
            "&:hover": { background: "#dc2626" },
            fontWeight: 600,
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;
