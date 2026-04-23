import React, { useEffect, useState } from "react";
import DataTable from "./common/DataTable";
import FormDialog from "./FormDialog";
import { userService } from "./userService";

export default function UserTableList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Columns
  const columns = [
    { field: "name", headerName: "Full Name" },
    { field: "email", headerName: "Email Address" },
    { field: "gender", headerName: "Gender" },
  ];

  const loadUsers = async () => {
    const res = await userService.getAll();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Handlers
  const handleAddNew = () => {
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await userService.delete(id);
      loadUsers();
    }
  };

  const handleSave = async (formData) => {
    if (selectedUser) {
      await userService.update(selectedUser.id, formData);
    } else {
      await userService.create(formData);
    }
    setIsDialogOpen(false);
    loadUsers();
  };

  return (
    <>
      <DataTable
        title="User List"
        columns={columns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
        addButtonLabel="NEW USER"
      />

      <FormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        user={selectedUser}
        onSave={handleSave}
        key={selectedUser?.id || "new"}
      />
    </>
  );
}
