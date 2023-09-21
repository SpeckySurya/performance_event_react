import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminService from "../../services/AdminService";
import { Button, MenuItem, Select } from "@mui/material";
import PasswordService from "../../services/PasswordService";
import PopupAlert from "../PopupAlert/PopupAlert";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";

export default function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [roles, setRoles] = useState([]);
  const [dialog, setDialog] = useState({
    open: false,
    action: null,
    data: {},
  });
  const [snackbar, setSnackbar] = useState(null);

  const adminService = new AdminService();

  function dateConversion(isoDate) {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedDate;
  }

  function getAllAdmins() {
    adminService
      .getAdmins()
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAllRoles() {
    const passwordService = new PasswordService();
    passwordService
      .getAdminRoles()
      .then((res) => {
        setRoles(res.data);
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    getAllAdmins();
    getAllRoles();
  }, []);

  function handleDelete(adminId) {
    adminService
      .deleteAdmin(adminId)
      .then((response) => {
        getAllAdmins();
        setSnackbar(
          <SnackbarComponent message={"Admin deleted !"} severity={"success"} />
        );
      })
      .catch((error) => {
        alert(error);
      });
  }

  useEffect(() => {
    if (dialog.action === "Yes") {
      handleDelete(dialog.data.adminId);
    }
  }, [dialog]);

  function roleHandler(e, adminId) {
    console.log(e.target.value, adminId);
    adminService
      .updateRole(adminId, { role: e.target.value })
      .then((response) => {
        getAllAdmins();
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      {snackbar}
      <PopupAlert
        control={{
          dialog: dialog,
          setDialog: setDialog,
        }}
        title="Alert"
        content={"Do you really want to delete ?"}
        action={{ first: "Yes", second: "No" }}
      />
      <TableContainer sx={{ marginTop: 8 }} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }} align="left">
                Admin Email
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Created At
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Updated At
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Created By
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((admin) => (
              <TableRow
                key={admin.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {admin.email}
                </TableCell>
                <TableCell align="center">
                  {dateConversion(admin.createdAt)}
                </TableCell>
                <TableCell align="center">
                  {dateConversion(admin.updatedAt)}
                </TableCell>
                <TableCell align="center">
                  {admin.createdBy ? admin.createdBy : "Owner"}
                </TableCell>
                <TableCell align="center">
                  {admin.createdBy ? (
                    <Select
                      value={admin.role}
                      onChange={(e) => roleHandler(e, admin.id)}
                      name="role"
                    >
                      {roles.map((role, index) => (
                        <MenuItem key={index} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <Button variant="outlined" disabled>
                      ADMIN
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  {admin.createdBy ? (
                    <Button
                      onClick={() =>
                        setDialog({
                          ...dialog,
                          open: true,
                          data: { adminId: admin.id },
                        })
                      }
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button variant="outlined" disabled>
                      Root Admin
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
