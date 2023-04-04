import React, { useState, useMemo } from "react";
import Link from "next/link";
import useSWR from "swr";
import {
  Autocomplete,
  TextField,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Popper,
  InputAdornment,
  Card,
  Box,
  autocompleteClasses,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSetSnackbar } from "../../../../utils/hooks/useSnackbar";
import getCloudinaryUrl from "../../../../lib/cloudinary/getCloudinaryUrl";
import { useSearchData } from "../../../../utils/hooks/useSearchData";

interface RenderOptionProps {
  name: string;
  image: string;
  search_key: string;
  _id: string;
  slug: string;
  brewery_type: string;
  brewery_name: string;
}

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  width: "100%",
  maxWidth: 600,

  "& .MuiPaper-root": {
    boxShadow: "none",
  },
}));

const StyledPopper = styled(Popper)(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    //paper is the listbox parent container
    boxShadow: "none",
    borderTop: `0.25px solid #BDBDBD`,
    borderBottom: `0.5px solid #BDBDBD`,
    borderLeft: `1px solid #BDBDBD`,
    borderRight: `0.25px solid #BDBDBD`,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    //listbox is the search result list container
    padding: 0,
    boxShadow: "none",

    "&& li.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: "none",
    },
    [`& .${autocompleteClasses.option}`]: {
      //option is the search result list item
      boxShadow: "none",
      padding: "0px 10px",
      alignItems: "center",
      borderBottom: "1px solid #eaecef",
    },
  },
}));

//TODO: fix search border overlap when search bar is focused without dropdown shown
const HeroSearchBar = () => {
  const [searchKey, setSearchKey] = useState("");
  const { searchData, error, isLoading } = useSearchData(searchKey);
  const setSnackbar = useSetSnackbar();
  console.log(searchKey);
  if (error) {
    setSnackbar(error.message, "error");
  }

  const onChangeSearch = (
    _: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setSearchKey(value);
  };

  return (
    <Box>
      <StyledAutoComplete
        loading={isLoading || searchKey.length > 0}
        loadingText={`No results for ${searchKey}`}
        id="search-bar"
        freeSolo
        inputValue={searchKey}
        onInputChange={onChangeSearch}
        PopperComponent={StyledPopper}
        filterOptions={(option) => option}
        options={searchData ? searchData : []}
        groupBy={(option: RenderOptionProps) => option.search_key}
        getOptionLabel={(option: RenderOptionProps) => option.name || ""}
        renderInput={(params) => (
          <Box component={Card}>
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              color="primary"
              focused
              placeholder="Search for Kombucha, Breweries..."
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  //remove preset outline from textfield
                  border: "0 !important",
                },
              }}
              InputProps={{
                ...params.InputProps,
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                  }
                },
                startAdornment: (
                  <InputAdornment position="start">
                    {isLoading ? (
                      <CircularProgress />
                    ) : (
                      <Box
                        component={"svg"}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        width={24}
                        height={24}
                        color="disabled"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </Box>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
        renderOption={(props, option: RenderOptionProps) => {
          const {
            name,
            brewery_name,
            image,
            search_key,
            _id,
            slug,
            brewery_type,
          } = option;
          const getHref =
            search_key === "kombucha"
              ? `/${search_key}/${_id}`
              : `/${search_key}/${slug}`;
          return (
            <React.Fragment key={name}>
              <Link href={getHref} passHref>
                <Box
                  sx={{
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  <ListItem {...props}>
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        alt={name}
                        src={getCloudinaryUrl(image)}
                        sx={{ width: 40, height: 40 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      id={name}
                      primary={name}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        component: "a",
                      }}
                      secondary={
                        search_key === "kombucha" ? brewery_name : brewery_type
                      }
                    />
                  </ListItem>
                </Box>
              </Link>
            </React.Fragment>
          );
        }}
        renderGroup={(params) => {
          const { group, key, children } = params;
          return (
            <Box key={key}>
              <Typography
                variant="body1"
                color="text.primary"
                fontWeight="600"
                p={1.5}
                sx={{ bgcolor: "#ECECEC", textTransform: "capitalize" }}
              >
                {group}
              </Typography>
              {children}
              <Box p={1}>
                <Link href={`/search/${group}/?search=${searchKey}`} passHref>
                  <Typography
                    component="a"
                    variant="subtitle2"
                    color="info.dark"
                    fontWeight="600"
                  >
                    See all {group} for {`"${searchKey}"`}
                  </Typography>
                </Link>
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default HeroSearchBar;
