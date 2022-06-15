import { Chip, Box } from "@mui/material";

const ProductTypeChips = ({ list }) => {
  const getColor = (name) => {
    switch (name) {
      case "Kombucha":
        return "primary";
      case "Hard Kombucha":
        return "error";
      case "Jun":
        return "success";
      default:
        return "primary";
    }
  };
  return (
    <Box>
      {list.map((type) => (
        <Chip
          label={type}
          size="small"
          color={getColor(type)}
          sx={{
            ml: 0.65,
            fontSize: "0.75rem",
            height: 20,
          }}
          key={type}
        />
      ))}
    </Box>
  );
};

export default ProductTypeChips;
