import * as React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function BaseDialog({
  open,
  onClose,
  onSave,
  title,
  initialData,
  children,
  submitLabel = "Save",
}) {
  const [formData, setFormData] = useState(initialData);

  // Sync state when dialog opens or initialData changes
  useEffect(() => {
    if (open) {
      setFormData(initialData);
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {/* We pass handleChange and formData to children via React.cloneElement 
              or simply context, but for simplicity, we pass them as a function child */}
          {typeof children === "function"
            ? children({ formData, handleChange })
            : children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            {submitLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
