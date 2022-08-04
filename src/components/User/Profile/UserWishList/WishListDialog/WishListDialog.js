import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import WishListItems from "../WishListItems";

const WishListDialog = ({ openDialog, setOpenDialog, wishList, name }) => {
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
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
          {wishList.length ? (
            <WishListItems wishList={wishList} />
          ) : (
            <>
              <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                fontWeight="500"
                py={2}
              >
                No items added to wish list.
              </Typography>
              <Divider />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WishListDialog;
