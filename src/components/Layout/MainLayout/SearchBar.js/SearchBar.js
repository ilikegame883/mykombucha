import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  FormControl,
  InputAdornment,
  OutlinedInput,
  useTheme,
} from "@mui/material";

const SearchBar = () => {
  const theme = useTheme();
  const router = useRouter();

  const onSubmit = (e) => {
    if (e.key === "Enter") {
      router.push(`/search/kombucha/?q=${e.target.value}`);
    }
  };

  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        flexGrow: 1,
        marginX: 2,
        "& .MuiOutlinedInput-notchedOutline": {
          border: "0 !important",
        },
        "& .MuiOutlinedInput-input": {
          padding: 0.75,
        },
      }}
    >
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          placeholder="Search for Kombucha, Breweries..."
          onKeyPress={(e) => {
            onSubmit(e);
          }}
          sx={{
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          }}
          startAdornment={
            <InputAdornment position="start">
              <Box
                component="svg"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width={20}
                height={20}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </Box>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;
