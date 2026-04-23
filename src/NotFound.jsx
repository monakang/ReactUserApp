import { Link } from "react-router-dom";
export default function NotFound({
  message = "Oops! This page doesn't exist.",
  title = "404 - Page Not Found",
  className = "",
}) {
  return (
    <div
      className={`not-found-container ${className}`}
      style={{ textAlign: "center", padding: "50px" }}
    >
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go back to Home
      </Link>
    </div>
  );
}
