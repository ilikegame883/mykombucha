import { Box, Typography } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";

const CommentCard = () => {
  return (
    <>
      <Box mt={2} display="flex" alignItems="center">
        <FindInPageOutlinedIcon
          color="primary"
          sx={{ fontSize: 65, opacity: 0.3 }}
        />
        <Typography variant="body2" color="text.primary" ml={2}>
          Comment functionality in progress...
        </Typography>
      </Box>
    </>
  );
};

export default CommentCard;
