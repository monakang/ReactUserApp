import { TextField } from "@mui/material";

export const FormInput = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  helperText,
  ...props
}) => (
  <TextField
    fullWidth
    label={label}
    name={name}
    type={type}
    margin="normal"
    required
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={name === "password" ? helperText : ""}
    {...props}
  />
);
