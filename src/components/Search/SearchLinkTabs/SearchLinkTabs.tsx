import React from "react";
import Link from "next/link";
import { Box, Typography, Tabs, Tab } from "@mui/material";

interface SearchLinkTabsProps {
  category: string;
  kombuchaTabCount: number;
  breweryTabCount: number;
  searchBar: string;
  children: React.ReactNode;
}

interface LinkTabProps {
  label: string;
  href: string;
  value: string;
}

const SearchLinkTab = ({ label, href, value }: LinkTabProps) => {
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
  kombuchaTabCount,
  breweryTabCount,
  searchBar,
}: SearchLinkTabsProps) => {
  const getSearchResultCount = (filter: string = null) => {
    if (!searchBar) return "";
    if (filter === "kombucha") {
      //Don't show count if no search result []
      return !kombuchaTabCount ? "" : `(${kombuchaTabCount})`;
    }
    if (filter === "breweries") {
      return !breweryTabCount ? "" : `(${breweryTabCount})`;
    }
  };
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
              label={`Kombucha ${getSearchResultCount("kombucha")}`}
              href={`/search/kombucha${
                searchBar ? `?search=${searchBar}` : ""
              }`}
              value="kombucha"
            />
            <SearchLinkTab
              label={`Breweries ${getSearchResultCount("breweries")}`}
              href={`/search/breweries${
                searchBar ? `?search=${searchBar}` : ""
              }`}
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
