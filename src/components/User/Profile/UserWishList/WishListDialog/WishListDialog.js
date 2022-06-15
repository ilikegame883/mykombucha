import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
        // fullWidth ?
        sx={{
          height: 600,
          "& .MuiPaper-root": {
            width: "100%",
            m: 1,
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title" fontWeight="700">
          Wish List
        </DialogTitle>
        <DialogContent sx={{ p: 0 }} dividers={true}>
          <WishListItems wishList={wishList} />
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
