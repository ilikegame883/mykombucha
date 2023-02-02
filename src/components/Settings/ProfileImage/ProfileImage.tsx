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
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  removeProfileImage,
  updateProfileImage,
  updateSession,
} from "../../../utils/api-utils";
import { useSetSnackbar } from "../../../utils/hooks/useSnackbar";
import { UserData } from "../../../types/api";

interface ProfileImageFormProps {
  userData: UserData; //TODO: type this
}
const Input = styled("input")({
  display: "none",
});

const ProfileImage = ({ userData }: ProfileImageFormProps) => {
  const [openImage, setOpenImage] = useState(false);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const setSnackbar = useSetSnackbar();

  const { _id, username, profile } = userData;
  const userId = _id as string;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; //2mb
    if (!file) {
      setSnackbar("File does not exist.", "error");
      return;
    }

    if (file.size > maxSize) {
      setSnackbar("The largest image size is 2mb.", "error");
      return;
    }

    //jpeg & png
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setSnackbar(
        "Image format is incorrect. Please use jpeg or png photo.",
        "error"
      );
      return;
    }
    setUploadImage(file);
  };

  const responseAction = async (res: { msg: string; err: string }) => {
    if (res?.msg) {
      setSnackbar(res.msg, "success");
      await updateSession();
      mutate(`/api/users/${userId}`);
      handleClose();
    } else if (res?.err) {
      setSnackbar(res.err, "error");
    }
  };

  const handleClose = () => {
    setLoading(false);
    setUploadImage(null);
    setOpenImage(false);
    setDeleteAlert(false);
  };

  const handleImageUpdate = async () => {
    //need image_id to delete image from cloudinary
    setLoading(true);
    const res = await updateProfileImage(uploadImage, profile.image_id, userId);
    responseAction(res);
  };

  const handleImageDelete = async () => {
    const res = await removeProfileImage(profile.image_id, userId);
    responseAction(res);
  };

  return (
    <>
      <Box display="flex" justifyContent="center" mb={2}>
        <Box position="relative">
          <Avatar src={profile.image} sx={{ width: 140, height: 140 }} />

          <Box
            sx={{
              position: "absolute",
              bottom: -5,
              right: 2,
              backgroundColor: "#fff",
              borderRadius: "50%",
              boxShadow: 3,
            }}
          >
            <IconButton
              color="primary"
              aria-label="upload profile pic"
              component="span"
              onClick={() => setOpenImage(true)}
              sx={{
                p: "6px",
              }}
            >
              <PhotoCamera />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Typography
        variant="h6"
        align="center"
        fontWeight="500"
        gutterBottom
        sx={{ textTransform: "capitalize" }}
      >
        {username}
      </Typography>
      <Dialog
        onClose={handleClose}
        open={openImage}
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
              //@ts-ignore
              src={
                uploadImage ? URL.createObjectURL(uploadImage) : profile.image
              }
              sx={{ width: 180, height: 180 }}
            />
            {uploadImage && (
              <Button
                variant="contained"
                color="info"
                onClick={handleImageUpdate}
                disabled={loading}
              >
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
                  onChange={handleImageChange}
                />
                <Button
                  variant="outlined"
                  color="info"
                  component="span"
                  size="large"
                  startIcon={<EditOutlinedIcon />}
                >
                  Change
                </Button>
              </label>

              <Button
                variant="outlined"
                color="error"
                size="large"
                startIcon={<DeleteOutlineOutlinedIcon />}
                onClick={() => setDeleteAlert(true)}
                disabled={Boolean(uploadImage) || !Boolean(profile.image)}
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
                  onClick={handleImageDelete}
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

export default ProfileImage;
