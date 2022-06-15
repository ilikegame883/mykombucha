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
import SortMenu from "./SortMenu/SortMenu";

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

const BreweryLinkTabs = ({
  children,
  category,
  pageCount,
  currentPage,
  setSort,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();
  const [value, setValue] = useState("list");

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
    router.push(`/breweries/explore/${category}/${page}`);
  };

  return (
    <>
      <Box sx={{ width: "100%" }} display="flex" flexDirection="column">
        <Box pb={3}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexWrap: "wrap" }}
          >
            <Typography
              variant={isSm ? "h4" : "h5"}
              fontWeight="700"
              // sx={{ textTransform: "capitalize" }}
            >
              Explore{" "}
              <Typography
                component="span"
                variant={isSm ? "h4" : "h5"}
                color="secondary"
                fontWeight="700"
              >
                Breweries
              </Typography>
            </Typography>
            {category === "list" && (
              <Box>
                <SortMenu setSort={setSort} />
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
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
              label="List"
              href="/breweries/explore/list/1"
              value="list"
            />
            <NextLinkTab
              label="Popular"
              href="/breweries/explore/popular/1"
              value="popular"
            />
            <NextLinkTab
              label="Local"
              href="/breweries/explore/local/1"
              value="local"
            />
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

export default BreweryLinkTabs;
