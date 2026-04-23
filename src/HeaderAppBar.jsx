import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function HeaderAppBar({
  title = "My App",
  onMenuClick,
  showMenuIcon = true,
  children, // To pass buttons/actions to the right side
  sx = {},
}) {
  return (
    <Box sx={{ flexGrow: 1, ...sx }}>
      <AppBar position="static">
        <Toolbar>
          {showMenuIcon && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={onMenuClick}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>{children}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
