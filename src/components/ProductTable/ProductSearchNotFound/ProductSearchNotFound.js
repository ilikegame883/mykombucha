import { Stack, Typography } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";

const ProductSearchNotFound = ({ searchQuery }) => {
  return (
    <>
      <FindInPageOutlinedIcon
        color="primary"
        sx={{ fontSize: 84, opacity: 0.3 }}
      />
      <Typography variant="h6" fontWeight="700" mb={1}>
        No Matches Found
      </Typography>
      <Typography variant="body1">
        {/* No results found for <b>{`"${searchBar}"`}</b>. Try checking for typos
        or using complete words. */}
        Try using complete words or check the other category.
      </Typography>
    </>
  );
};

export default ProductSearchNotFound;
