import { Chip, Box } from "@mui/material";
import getChipColor from "../utils/getChipColor";

//Render custom chips based on  Kombucha and/or Brewery product types (e.g. "kombucha, hard kombucha, jun, etc...")
const CustomChips = ({ type }) => {
  if (!Array.isArray(type))
    return (
      <Chip
        label={type}
        size="small"
        sx={{
          mr: 0.25,
          fontSize: "0.80em",
          height: 20,

          color: "text.primary",
          bgcolor: getChipColor(type),
        }}
      />
    );
  return (
    <Box>
      {type.map((item) => (
        <Chip
          label={item}
          size="small"
          sx={{
            mr: 0.25,
            fontSize: "0.75em",
            height: 20,
            color: "text.primary",
            bgcolor: getChipColor(item),
          }}
          key={item}
        />
      ))}
    </Box>
  );
};

export default CustomChips;