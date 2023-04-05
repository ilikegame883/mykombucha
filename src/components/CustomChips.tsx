import { Chip, Box } from "@mui/material";

//Render custom chips based on  Kombucha and/or Brewery product types
//(e.g. "kombucha, hard kombucha, jun, etc...")
const CustomChips = ({ type }: { type: string | string[] }) => {
  const getChipColor = (name: string) => {
    switch (name) {
      case "Kombucha":
        return "#FFEBCE";
      case "Kombucha (Caffeinated)":
        return "#DDEBF1";
      case "Hard Kombucha":
        return "#FBE4E4";
      case "Hard Jun":
        return "#FBE4E4";
      case "Kombucha (CBD)":
        return "#DDEDEA";
      case "Jun":
        return "#DDEDEA";
      default:
        return "#FFEBCE";
    }
  };

  if (!Array.isArray(type))
    return (
      <Chip
        label={type}
        size="small"
        sx={{
          mr: 0.25,
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
