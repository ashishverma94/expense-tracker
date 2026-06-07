import {
  Dialog,
  Select,
  Button,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
  FormHelperText,
} from "@mui/material";
import { Expense } from "@/types/type";
import { CATEGORIES } from "@/utils/list";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";

type ExpenseForm = Pick<
  Expense,
  "_id" | "title" | "amount" | "category" | "notes" | "expenseDate"
>;

type FormErrors = Partial<Record<keyof ExpenseForm, string>>;

const emptyForm = (): ExpenseForm => ({
  title: "",
  amount: 0,
  category: "",
  notes: "",
  expenseDate: new Date().toISOString().split("T")[0],
});

function validate(f: ExpenseForm): FormErrors {
  const e: FormErrors = {};
  if (!f.title.trim()) e.title = "Title is required";
  if (!f.amount || f.amount <= 0) e.amount = "Enter a valid amount";
  if (!f.category) e.category = "Select a category";
  if (!f.expenseDate) e.expenseDate = "Date is required";
  return e;
}

function ExpenseDialog({
  open,
  onClose,
  initial,
  onSave,
  isDark,
}: {
  open: boolean;
  onClose: () => void;
  initial: Expense | null;
  onSave: (e: ExpenseForm & { _id?: string }) => void;
  isDark: boolean;
}) {
  const [form, setForm] = useState<ExpenseForm>(emptyForm());
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              title: initial.title,
              amount: initial.amount,
              category: initial.category,
              notes: initial.notes,
              expenseDate: initial.expenseDate,
            }
          : emptyForm(),
      );
      setErrors({});
    }
  }, [open, initial]);

  const set = <K extends keyof ExpenseForm>(k: K, v: ExpenseForm[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      const n = { ...e };
      delete n[k];
      return n;
    });
  };

  const handleSave = () => {
    const errs = validate(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    console.log(form);
    onSave({ ...form, ...(initial?._id ? { _id: initial._id } : {}) });
    onClose();
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      fontSize: "0.875rem",
      color: isDark ? "#f9fafb" : "#111827",
      "& fieldset": {
        borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.15)",
      },
      "&:hover fieldset": { borderColor: "#22c55e" },
      "&.Mui-focused fieldset": { borderColor: "#22c55e" },
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.875rem",
      color: isDark ? "#6b7280" : "#9ca3af",
      "&.Mui-focused": { color: "#22c55e" },
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
        sx={{
          fontWeight: 700,
          fontSize: "1.125rem",
          color: isDark ? "#f9fafb" : "#111827",
          pb: 0,
        }}
      >
        <div className="flex items-center justify-between">
          <span>{initial ? "Edit Expense" : "Add Expense"}</span>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ color: isDark ? "#6b7280" : "#9ca3af" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent
        sx={{
          pt: "20px !important",
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          sx={fieldSx}
          fullWidth
        />
        <TextField
          label="Amount (₹)"
          type="number"
          value={form.amount || ""}
          onChange={(e) => set("amount", parseFloat(e.target.value) || 0)}
          error={!!errors.amount}
          helperText={errors.amount}
          sx={fieldSx}
          fullWidth
        />
        <FormControl error={!!errors.category} sx={fieldSx} fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={form.category}
            label="Category"
            onChange={(e) => set("category", e.target.value)}
            sx={{ color: isDark ? "#f9fafb" : "#111827" }}
          >
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c} sx={{ fontSize: "0.875rem" }}>
                {c}
              </MenuItem>
            ))}
          </Select>
          {errors.category && (
            <FormHelperText>{errors.category}</FormHelperText>
          )}
        </FormControl>
        <TextField
          label="Expense Date"
          type="date"
          value={form.expenseDate}
          onChange={(e) => set("expenseDate", e.target.value)}
          error={!!errors.expenseDate}
          helperText={errors.expenseDate}
          InputLabelProps={{ shrink: true }}
          sx={fieldSx}
          fullWidth
        />
        <TextField
          label="Notes (optional)"
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          multiline
          rows={2}
          sx={fieldSx}
          fullWidth
        />
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
          onClick={handleSave}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            background: "#22c55e",
            "&:hover": { background: "#16a34a" },
            px: 3,
            fontWeight: 600,
          }}
        >
          {initial ? "Save Changes" : "Add Expense"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExpenseDialog;
