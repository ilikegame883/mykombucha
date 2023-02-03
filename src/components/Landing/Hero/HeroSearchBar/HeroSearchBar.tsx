import React, { useState, useMemo } from "react";
import Link from "next/link";
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
import { getData } from "../../../../utils/fetch-utils";
import getCloudinaryUrl from "../../../../lib/cloudinary/getCloudinaryUrl";
import debounce from "../../../../utils/debounce";
import { useSetSnackbar } from "../../../../utils/hooks/useSnackbar";

interface RenderOptionProps {
  //TODO: Extend types from KombuchaData and BreweryData
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
    borderLeft: `1px solid #BDBDBD`,
    borderBottom: `0.5px solid #BDBDBD`,
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

//TODO: fix border overlap when search bar is focused
const HeroSearchBar = () => {
  const [value, setValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const setSnackbar = useSetSnackbar();

  const getSearchData = async (str: string) => {
    try {
      let kombuchaSearchData = await getData("kombucha/search", `${str}`);
      let brewerySearchData = await getData("breweries/search", `${str}`);
      setSearchData([...kombuchaSearchData, ...brewerySearchData]);
    } catch (error) {
      setSnackbar(error.message, "error");
    }
  };
  const debounceSearch = useMemo(() => debounce(getSearchData, 250), []);

  const onChangeSearch = async (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    if (value) {
      setValue(value);
      debounceSearch(e.target.value);
      return;
    }
    //clear state backspace or clear iconbutton is clicked
    setValue("");
    setSearchData([]);
  };

  return (
    <Box>
      <StyledAutoComplete
        loading={value.length > 1 && searchData.length <= 0 ? true : false}
        loadingText={`No results for ${value}`}
        id="search-bar"
        freeSolo
        inputValue={value}
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
                    {value.length > 1 && searchData.length <= 0 ? (
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
                <Link href={`/search/${group}/?search=${value}`} passHref>
                  <Typography
                    component="a"
                    variant="subtitle2"
                    color="info.dark"
                    fontWeight="600"
                  >
                    See all {group} for {`"${value}"`}
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
