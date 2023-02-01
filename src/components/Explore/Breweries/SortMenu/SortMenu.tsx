import React, { useState } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  useTheme,
} from "@mui/material";

const SortMenu = ({ setFilterListBy }) => {
  const theme = useTheme();
  const [value, setValue] = useState("Recent");

  const handleChange = (event) => {
    setValue(event.target.value);
    setFilterListBy(event.target.value);
  };

  return (
    <Box sx={{ minWidth: { xs: 110, md: 140 } }}>
      <FormControl fullWidth sx={{ bgcolor: theme.palette.background.paper }}>
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="brewery-filter-select-label"
          id="brewery-filter-select"
          value={value}
          label={value}
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
