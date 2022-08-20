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
import { deleteImage, imageUploadSDK } from "../../../../utils/imageUpload";
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
  const [uploadImage, setUploadImage] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const router = useRouter();

  const changeProfilePic = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; //2mb

    if (!file) return toggleSnackBar("error", "File does not exist.", true);

    if (file.size > maxSize)
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

    setUploadImage(file);
  };

  const handleClose = () => {
    setOpen(false);
    //mutate to real time update user avatar on navbar
    mutate(`/api/users/${username}`);
    setDeleteAlert(false);
    setUploadImage("");
  };

  const updatePhoto = async () => {
    let media;

    if (uploadImage) {
      media = await imageUploadSDK(uploadImage);
      //add error handling
      await deleteImage(currentPhoto?.public_id);
      const res = await patchData(`users/${username}`, {
        avatar: { image: media.url, public_id: media.public_id },
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
      await deleteImage(currentPhoto?.public_id);
      const resDB = await patchData(`users/${username}`, {
        avatar: { image: "", public_id: "" },
      });
      if (resDB?.msg) {
        dispatch(toggleSnackBar("success", resDB.msg, true));
        handleClose();
        router.replace(router.asPath);
      }
      if (resDB?.err) {
        dispatch(toggleSnackBar("error", resDB.err, true));
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
              src={
                uploadImage
                  ? URL.createObjectURL(uploadImage)
                  : currentPhoto.image
              }
              sx={{ width: 180, height: 180, mb: 1.5 }}
            />

            {uploadImage && (
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
                disabled={uploadImage || !currentPhoto ? true : false}
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
