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
import {
  deleteImage,
  imageUploadSDK,
} from "../../../../lib/cloudinary/imageUpload";
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
    //call mutate to show live update of avatar image change
    mutate(`/api/users/${username}`);
    setOpen(false);
    setDeleteAlert(false);
    setUploadImage("");
  };

  const updatePhoto = async () => {
    if (uploadImage) {
      //delete the user's current photo from cloudinary
      await deleteImage(currentPhoto?.public_id);

      //upload new uploaded image to cloudinary
      //add image and public_id received from cloudinary to user's document in DB
      const mediaRes = await imageUploadSDK(uploadImage);
      const res = await patchData(`users/${username}`, {
        avatar: { image: mediaRes.url, public_id: mediaRes.public_id },
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
          p: "6px",
        }}
      >
        <PhotoCamera />
      </IconButton>

      <Dialog
        onClose={handleClose}
        open={open}
        maxWidth="xs"
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
            py: { xs: 4, sm: 5 },
            px: 3,
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
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight="600"
              gutterBottom
            >
              Profile Picture
            </Typography>

            <Typography variant="body1" color="text.primary" gutterBottom>
              A picture helps people recognize you and lets you know when you’re
              signed in to your account.
            </Typography>
            <Divider sx={{ my: 3 }} />
          </Box>
          <Stack mb={4} spacing={2}>
            <Avatar
              src={
                uploadImage
                  ? URL.createObjectURL(uploadImage)
                  : currentPhoto.image
              }
              sx={{ width: 180, height: 180 }}
            />
            {uploadImage && (
              <Button variant="contained" color="info" onClick={updatePhoto}>
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
                disabled={uploadImage || !currentPhoto?.image}
              >
                Remove
              </Button>
            </Stack>
          ) : (
            <Stack>
              <Typography color="info" mb={2} variant="body1" fontWeight="600">
                Are you sure you want to delete your photo?
              </Typography>
              <Box display="flex" justifyContent="center">
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mr: 1 }}
                  onClick={removePhoto}
                >
                  Confirm
                </Button>
                <Button
                  variant="outlined"
                  color="info"
                  onClick={() => {
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
