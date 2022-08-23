import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Typography, Tabs, Tab } from "@mui/material";

const NextLinkTab = ({ label, href, tabValue }) => {
  //wrap next Link component to Tab component for navigation
  //pass in value to Tab component so it can match with the current state of the page
  return (
    <Link href={href} passHref>
      <Tab
        component="a"
        label={label}
        value={tabValue}
        sx={{ fontSize: "16px", fontWeight: 700 }}
      />
    </Link>
  );
};

const ExploreTabs = ({ children, category }) => {
  const [tabValue, setTabValue] = useState("recent");

  useEffect(() => {
    //category name received from getStaticProps
    //setTabValue to match with the current page
    if (category) {
      setTabValue(category);
    }
  }, [category]);

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
                {tabValue === "recent"
                  ? "Kombucha Reviews"
                  : `${tabValue} Kombucha`}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box mb={2}>
          {/* //Tabs children must have prop named value */}
          <Tabs
            value={tabValue}
            aria-label="explore kobmucha tabs"
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
          </Tabs>
        </Box>
        {children}
      </Box>
    </>
  );
};

export default ExploreTabs;
