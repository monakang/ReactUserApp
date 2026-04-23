import "./App.css";
import HeaderAppBar from "./HeaderAppBar";
import UserTableList from "./UserTableList.jsx";
import NotFound from "./NotFound.jsx";
import Login from "./Login.jsx";
import { AuthProvider } from "./AuthContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HeaderAppBar title="React CRUD App" />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user" element={<UserTableList />} />
          <Route path="/add" element={<UserTableList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit/:id" element={<UserTableList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
