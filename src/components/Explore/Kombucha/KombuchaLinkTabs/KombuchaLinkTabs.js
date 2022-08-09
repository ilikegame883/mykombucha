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
  useTheme,
  useMediaQuery,
} from "@mui/material";

const NextLinkTab = ({ label, href, value }) => {
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

const KombuchaLinkTabs = ({ children, category, pageCount, currentPage }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  const router = useRouter();
  const [value, setValue] = useState("recent");

  useEffect(() => {
    //category value received from parent page
    //setState to category after new page renders
    //state will be the selected tab from set by Tabs component
    if (category) {
      setValue(category);
    }
  }, [category]);

  const handleChangePageButton = (event, page) => {
    //parameter page: page selected, is from <Pagination /> Component
    router.push(`/kombucha/explore/${category}/${page}`);
  };

  return (
    <>
      <Box sx={{ width: "100%" }} display="flex" flexDirection="column">
        <Box mb={2}>
          <Box display="flex" flexWrap="wrap">
            <Box>
              <Typography
                color="secondary"
                fontWeight="600"
                variant="subtitle1"
              >
                Explore
              </Typography>
              <Typography
                variant="h4"
                fontWeight="700"
                sx={{ textTransform: "capitalize" }}
              >
                {value === "recent" ? "Kombucha Reviews" : `${value} Kombucha`}
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
            <NextLinkTab
              label="Recent"
              href="/kombucha/explore/recent/1"
              value="recent"
            />
            <NextLinkTab
              label="Top Rated"
              href="/kombucha/explore/top-rated/1"
              value="top-rated"
            />
            <NextLinkTab
              label="New"
              href="/kombucha/explore/new/1"
              value="new"
            />
            <NextLinkTab
              label="Popular"
              href="/kombucha/explore/popular/1"
              value="popular"
            />
            {/* <NextLinkTab
              label="Local"
              href="/kombucha/explore/local/1"
              value="local"
            /> */}
          </Tabs>
        </Box>
        {children}
      </Box>
      <Box mt={3} display="flex" justifyContent={"center"}>
        <Pagination
          color="primary"
          count={pageCount}
          page={parseInt(currentPage)} //highlight current selected page button
          shape="rounded"
          onChange={handleChangePageButton}
        />
      </Box>
    </>
  );
};

export default KombuchaLinkTabs;
