import React, { useState } from "react";
import Link from "next/link";
// import useSWR from "swr";
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
import { getData } from "../../../../utils/fetchData";

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  width: "100%",
  maxWidth: 600,
}));

const StyledPopper = styled(Popper)(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    //paper is the listbox parent container
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  [`& .${autocompleteClasses.listbox}`]: {
    //listbox is the search result list container
    padding: 0,
    "&& li.Mui-focused": {
      backgroundColor: "#fff",
    },
    [`& .${autocompleteClasses.option}`]: {
      //option is the search result list item
      padding: "0px 10px",
      alignItems: "center",
      borderBottom: "1px solid #eaecef",
    },
  },
}));

const HeroSearchBar = () => {
  const [searchData, setSearchData] = useState([]);
  const [value, setValue] = useState("");
  const getSearchData = async (str) => {
    try {
      let kombuchaSearchData = await getData("kombucha/search", `${str}`);
      let brewerySearchData = await getData("breweries/search", `${str}`);
      setSearchData([...kombuchaSearchData, ...brewerySearchData]);
      // return [...kombuchaSearchData, ...brewerySearchData];
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeSearch = async (e, value) => {
    if (value) {
      setValue(value);
      getSearchData(e.target.value);
      return;
    }
    //clear state when search bar has no inputvalue from backspace or clear iconbutton
    setValue("");
    setSearchData([]);
  };
  return (
    <Box>
      <StyledAutoComplete
        loading
        loadingText={`No results for "${value}"`}
        id="search-bar"
        freeSolo
        inputValue={value}
        onInputChange={(e, value) => onChangeSearch(e, value)}
        PopperComponent={StyledPopper}
        filterOptions={(option) => option}
        options={searchData ? searchData : ""}
        groupBy={(option) => option.category}
        getOptionLabel={(option) => option.name || ""}
        renderInput={(params) => (
          <Box component={Card}>
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              color="primary"
              focused
              placeholder="Search for Kombucha, Breweries..."
              // onChange={(e) => onChangeSearch(e)}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  //remove preset outline from textfield
                  border: "0 !important",
                },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    {value.length > 1 && !searchData.length ? (
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
        renderOption={(props, option) => {
          const { name, image, category, _id, slug, brewery_name } = option;
          const getHref =
            category === "kombucha"
              ? `/${category}/${_id}`
              : `/${category}/${slug}`;
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
                        src={image}
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
                        category === "kombucha" ? brewery_name : "Brewery"
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
                fontWeight="700"
                p={1.5}
                sx={{ bgcolor: "#ECECEC", textTransform: "capitalize" }}
              >
                {group}
              </Typography>
              {children}
              <Box p={1}>
                <Link href={`/search/${group}/?q=${value}`} passHref>
                  <Typography
                    component="a"
                    variant="subtitle2"
                    color="info.dark"
                    fontWeight="700"
                  >
                    See more {group} results for {`"${value}"`}
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
