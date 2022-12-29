import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Typography, Tabs, Tab, useTheme } from "@mui/material";

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

const SearchLinkTabs = ({ children, category, getSearchResultCount }) => {
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
            value={category}
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
              label={
                getSearchResultCount
                  ? `Breweries (${getSearchResultCount})`
                  : "Breweries"
              }
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
