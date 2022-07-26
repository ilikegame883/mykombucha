import React, { useState } from "react";
import { Divider, Box, Typography, Button } from "@mui/material";
import WishListItems from "./WishListItems";
import WishListDialog from "./WishListDialog";

const UserWishList = ({ wishList }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickWishList = () => {
    setOpenDialog(true);
  };
  return (
    <Box mb={2}>
      <Box p={1}>
        <Typography
          variant="h6"
          align="center"
          color="text.primary"
          fontWeight="600"
        >
          Wish List ({wishList.length})
        </Typography>
      </Box>
      <Divider />

      <WishListItems wishList={wishList} />
      <Box display="flex" justifyContent="center">
        <Button
          variant="text"
          color="secondary"
          onClick={handleClickWishList}
          sx={{ textTransform: "none", fontWeight: 700 }}
        >
          See all
        </Button>
      </Box>
      <WishListDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        wishList={wishList}
      />
    </Box>
  );
};

export default UserWishList;
