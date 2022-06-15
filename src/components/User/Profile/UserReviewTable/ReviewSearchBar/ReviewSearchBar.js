import { InputAdornment, OutlinedInput, Box, IconButton } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ClearIcon from "@mui/icons-material/Clear";

const ReviewSearchBar = ({
  searchUserReview,
  handleSearchUserReview,
  clearSearchBar,
}) => {
  return (
    <>
      <OutlinedInput
        value={searchUserReview}
        onChange={handleSearchUserReview}
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
          height: 35,
          width: { xs: 180, md: "auto" },
          borderRadius: 5,
        }}
      />
    </>
  );
};

export default ReviewSearchBar;
