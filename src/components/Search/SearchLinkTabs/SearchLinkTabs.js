import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Pagination,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const SearchLinkTab = ({ label, href, value }) => {
  //wrap next Link component to Tab component for navigation
  //pass in value to Tab component so it can match with the current state of the page
  return (
    <Link href={href} passHref>
      <Tab
        component="a"
        label={label}
        value={value}
        sx={{ fontSize: "16px", fontWeight: 700 }}
      />
    </Link>
  );
};

const SearchLinkTabs = ({
  children,
  category,
  pageCount,
  currentPage,
  setSort,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const [value, setValue] = useState();

  useEffect(() => {
    //category value received from parent page
    //setState to category after new page renders
    //state will be the selected tab from set by Tabs component
    if (category) {
      setValue(category);
    }
  }, [category]);

  return (
    <>
      <Box width={1} display="flex" flexDirection="column">
        <Box mb={2}>
          <Box display="flex" flexWrap="wrap">
            <Box>
              <Typography
                color="secondary"
                fontWeight="600"
                variant="subtitle1"
              >
                Search
              </Typography>
              <Typography
                variant="h4"
                fontWeight="700"
                sx={{ textTransform: "capitalize" }}
              >
                {category}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box mb={2}>
          {/* //Tabs children  must have prop named value */}
          <Tabs
            value={value}
            aria-label="nav tabs example"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTabs-scrollButtons.Mui-disabled": {
                opacity: 0.3,
              },
            }}
          >
            <SearchLinkTab
              label="Kombucha"
              href="/search/kombucha"
              value="kombucha"
            />
            <SearchLinkTab
              label="Breweries"
              href="/search/breweries"
              value="breweries"
            />
          </Tabs>
        </Box>

        {children}
      </Box>
    </>
  );
};

export default SearchLinkTabs;
