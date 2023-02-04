import { Typography } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";

interface ProductSearchNotFoundProps {
  category?: string;
}

const ProductSearchNotFound = ({ category }: ProductSearchNotFoundProps) => {
  return (
    <>
      <FindInPageOutlinedIcon
        color="primary"
        sx={{ fontSize: 84, opacity: 0.3 }}
      />
      <Typography variant="h6" fontWeight="700" mb={1}>
        No Matches Found
      </Typography>
      {category ? (
        <Typography variant="body1">
          {`Try using complete words or check the ${
            category === "kombucha" ? "Breweries" : "Kombucha"
          } tab.`}
        </Typography>
      ) : (
        <Typography variant="body1">
          No results match the search criteria. Clear search to show all
          results.
        </Typography>
      )}
    </>
  );
};

export default ProductSearchNotFound;
