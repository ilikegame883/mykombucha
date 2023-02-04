import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Box,
} from "@mui/material";
import { useState } from "react";
import WishListItems from "../WishListItems";

interface WishListDialogProps {
  wish_list: any[]; //TODO: set types
  userId: string;
}
const WishListDialog = ({ wish_list, userId }: WishListDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Button
          variant="text"
          color="secondary"
          onClick={() => setOpenDialog(true)}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          See all
        </Button>
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        scroll="paper"
        aria-labelledby="user-wish-list-dialog"
        aria-describedby="user-wish-list-items"
        sx={{
          height: 600,
          "& .MuiPaper-root": {
            width: "100%",
            m: 1,
          },
        }}
      >
        <DialogTitle
          id="scroll-dialog-title"
          fontWeight="700"
          sx={{ bgcolor: "#F7F9FC" }}
        >
          Wish List
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ p: 0 }}>
          <WishListItems wish_list={wish_list} userId={userId} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpenDialog(false)}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WishListDialog;
