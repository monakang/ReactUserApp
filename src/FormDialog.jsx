import { FormInput } from "./common/FormInput";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import BaseDialog from "./common/BaseDialog";

export default function FormDialog({ open, onClose, user, onSave }) {
  const defaultUser = { name: "", email: "", gender: "Male" };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      onSave={onSave}
      title={user ? "Update User" : "New User"}
      submitLabel={user ? "Update" : "Add"}
      initialData={user || defaultUser}
    >
      {({ formData, handleChange }) => (
        <>
          <FormInput
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoFocus
          />
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <RadioGroup
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            row
          >
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
          </RadioGroup>
        </>
      )}
    </BaseDialog>
  );
}
