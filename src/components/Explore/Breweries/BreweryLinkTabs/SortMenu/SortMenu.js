import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

const SortMenu = ({ setSort }) => {
  const theme = useTheme();
  const [sortValue, setSortValue] = React.useState("Recent");

  const handleChange = (event) => {
    setSortValue(event.target.value);
    setSort(event.target.value);
  };

  return (
    <Box sx={{ minWidth: { xs: 110, md: 140 } }}>
      <FormControl fullWidth sx={{ bgcolor: theme.palette.background.paper }}>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortValue}
          label={sortValue}
          onChange={handleChange}
          sx={{ fontSize: "1rem", "& .MuiInputBase-input": { py: 1.5 } }}
        >
          <MenuItem value="Recent">Recent</MenuItem>
          <MenuItem value="A-Z">A-Z</MenuItem>
          <MenuItem value="Z-A">Z-A</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortMenu;
