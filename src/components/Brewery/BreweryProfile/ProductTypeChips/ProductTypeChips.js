import { Chip, Box } from "@mui/material";
import getChipColor from "../../../../utils/getChipColor";

const ProductTypeChips = ({ list }) => {
  return (
    <Box>
      {list.map((type) => (
        <Chip
          label={type}
          size="small"
          sx={{
            mr: 0.5,
            fontSize: "0.75rem",
            color: "text.primary",
            bgcolor: getChipColor(type),
          }}
          key={type}
        />
      ))}
    </Box>
  );
};

export default ProductTypeChips;
