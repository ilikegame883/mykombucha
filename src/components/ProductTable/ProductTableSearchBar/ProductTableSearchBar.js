import { InputAdornment, OutlinedInput, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";

const ProductTableSearchBar = ({
  searchQuery,
  handleSearchBar,
  clearSearchBar,
}) => {
  return (
    <>
      <OutlinedInput
        value={searchQuery}
        onChange={handleSearchBar}
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlinedIcon fontSize="small" color="disabled" />
          </InputAdornment>
        }
        endAdornment={
          <IconButton edge="end" onClick={clearSearchBar}>
            <ClearIcon fontSize="small" color="disabled" />
          </IconButton>
        }
        sx={{ height: 35, borderRadius: 2.5, width: { xs: 200, sm: 250 } }}
      />
    </>
  );
};

export default ProductTableSearchBar;
