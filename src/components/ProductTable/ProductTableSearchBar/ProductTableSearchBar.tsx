import { InputAdornment, OutlinedInput, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";

interface ProductTableSearchBarProps {
  searchBar: string;
  handleSearchBar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearchBar: () => void;
}

const ProductTableSearchBar = ({
  searchBar,
  handleSearchBar,
  clearSearchBar,
}: ProductTableSearchBarProps) => {
  return (
    <>
      <OutlinedInput
        value={searchBar}
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
        sx={{
          backgroundColor: "common.white",
          height: 35,
          borderRadius: 2.5,
          width: { xs: 200, sm: 250 },
        }}
      />
    </>
  );
};

export default ProductTableSearchBar;
