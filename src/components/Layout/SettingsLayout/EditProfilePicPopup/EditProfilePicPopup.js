import React, { useState, useContext } from "react";
import { mutate } from "swr";
import {
  IconButton,
  Box,
  Dialog,
  Typography,
  Button,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { imageUpload } from "../../../../utils/imageUpload";
import { patchData } from "../../../../utils/fetchData";
import { useRouter } from "next/router";
import { AlertContext } from "../../../../stores/context/alert.context";
import { toggleSnackBar } from "../../../../stores/actions";

const Input = styled("input")({
  display: "none",
});

const EditProfilePicPopup = ({ username, currentPhoto }) => {
  const { dispatch } = useContext(AlertContext);

  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const router = useRouter();

  const changeProfilePic = (e) => {
    const file = e.target.files[0];
    if (!file) return toggleSnackBar("error", "File does not exist.", true);

    if (file.size > 1024 * 1024)
      //1mb
      return dispatch(
        toggleSnackBar("error", "The largest image size is 1mb.", true)
      );

    if (file.type !== "image/jpeg" && file.type !== "image/png")
      //jpeg & png
      return dispatch(
        toggleSnackBar(
          "error",
          "Image format is incorrect. Please use jpeg or png photo.",
          true
        )
      );

    setProfilePic(file);
  };

  const handleClose = () => {
    setOpen(false);
    //mutate to real time update user avatar on navbar
    mutate(`/api/users/${username}`);
    setDeleteAlert(false);
    setProfilePic("");
  };

  const updatePhoto = async () => {
    let media;

    if (profilePic) {
      media = await imageUpload(profilePic);
      //add error handling
      const res = await patchData(`users/${username}`, {
        avatar: media.url,
      });
      if (res?.msg) {
        dispatch(toggleSnackBar("success", res.msg, true));
        handleClose();
        router.replace(router.asPath);
      }
      if (res?.err) {
        dispatch(toggleSnackBar("error", res.err, true));
      }
    }
  };

  const removePhoto = async () => {
    //add error handling
    if (currentPhoto) {
      const res = await patchData(`users/${username}`, {
        avatar: "",
      });
      if (res?.msg) {
        dispatch(toggleSnackBar("success", res.msg, true));
        handleClose();
        router.replace(router.asPath);
      }
      if (res?.err) {
        dispatch(toggleSnackBar("error", res.err, true));
      }
    }
  };
  return (
    <>
      <IconButton
        color="primary"
        aria-label="upload profile pic"
        component="span"
        onClick={() => setOpen(true)}
        sx={{
          padding: "6px",
        }}
      >
        <PhotoCamera />
      </IconButton>

      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth={"xs"}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingY: { xs: 4, sm: 6 },
            paddingX: 4,
          }}
        >
          <IconButton
            color="primary"
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
          <Box>
            <Typography variant="h5" fontWeight="600" mb={2}>
              Profile Picture
            </Typography>

            <Typography variant="body1" color="text.primary" gutterBottom>
              A picture helps people recognize you and lets you know when you’re
              signed in to your account.
            </Typography>
            <Divider sx={{ my: 3 }} />
          </Box>
          <Stack mb={4} spacing={1}>
            <Avatar
              src={profilePic ? URL.createObjectURL(profilePic) : currentPhoto}
              sx={{ width: 180, height: 180, mb: 1.5 }}
            />

            {profilePic && (
              <Button variant="outlined" color="info" onClick={updatePhoto}>
                Update Photo
              </Button>
            )}
          </Stack>

          {!deleteAlert ? (
            <Stack direction="row" spacing={2}>
              <label htmlFor="outlined-button-file">
                <Input
                  accept="image/*"
                  id="outlined-button-file"
                  multiple
                  type="file"
                  onChange={changeProfilePic}
                />
                <Button
                  variant="outlined"
                  color="info"
                  component="span"
                  startIcon={<EditOutlinedIcon />}
                  sx={{ px: { xs: 3, sm: 5 } }}
                >
                  Change
                </Button>
              </label>

              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteOutlineOutlinedIcon />}
                sx={{ px: { xs: 3, sm: 5 } }}
                onClick={() => setDeleteAlert(true)}
                disabled={profilePic || !currentPhoto ? true : false}
              >
                Remove
              </Button>
            </Stack>
          ) : (
            <Stack>
              <Typography color="info" mb={2} fontWeight="500">
                Are you sure you want to remove your profile photo?
              </Typography>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mr: 2 }}
                  onClick={removePhoto}
                >
                  Confirm
                </Button>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => {
                    // setOpen(false);
                    setDeleteAlert(false);
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default EditProfilePicPopup;
