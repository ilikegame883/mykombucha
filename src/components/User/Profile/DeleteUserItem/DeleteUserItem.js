import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const DeleteUserItem = ({ handleDelete, item }) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleClickOpenAlert = () => {
    setOpenDeleteAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenDeleteAlert(false);
  };

  return (
    <>
      <IconButton sx={{ p: 0 }} onClick={handleClickOpenAlert}>
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={openDeleteAlert}
        onClose={handleCloseAlert}
        fullWidth
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-delete-review" fontWeight="700">
          Confirm Delete
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this kombucha - {` ${item}?`}
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 1.5 }}>
          <Button
            onClick={handleCloseAlert}
            autoFocus
            variant="text"
            sx={{ color: "common.black", fontWeight: 700 }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseAlert(); //state change needs to happen first
              handleDelete();
            }}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteUserItem;
