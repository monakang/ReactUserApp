import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
//import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function FormDialog({ open, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    gender: "Male",
  });

  // Update state whenever the 'user' prop changes (pre-filling)

  useEffect(() => {
    // ONLY reset/fill the form when the dialog is transitioning from CLOSED to OPEN
    if (open) {
      if (user) {
        setFormData({
          email: user.email || "",
          name: user.name || "",
          gender: user.gender || "Male",
        });
      } else {
        setFormData({ email: "", name: "", gender: "Male" }); // Reset for Add mode
      }
    }
  }, [open]);
  // }, [user, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  function handleSubmit(event) {
    event.preventDefault();

    // const data = new FormData(event.currentTarget);
    // const formValues = Object.fromEntries(data.entries());
    // onSave(formValues);
    onSave(formData);

    onClose(); // Call the parent's onClose handler
  }
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        disableRestoreFocus
        disableEnforceFocus
      >
        <DialogTitle>{user ? "Update User" : "New User"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              name="name"
              label="Name"
              fullWidth
              variant="standard"
              value={formData.name || ""}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={formData.email || ""}
              onChange={handleChange}
            />
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {user ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
