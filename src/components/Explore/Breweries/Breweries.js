import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import ExplorePagination from "../ExplorePagination";
import ExploreTabs from "../ExploreTabs";
import BreweryList from "./BreweryList/BreweryList";
import SortMenu from "./SortMenu";

const PAGE_SIZE = 8; //# of items to display per page page under tab
const TABS = ["list", "popular"];

const Breweries = ({ exploreBreweryData, category, page }) => {
  const [filterListBy, setFilterListBy] = useState("Recent");

  const { sorted_list, total_breweries } = exploreBreweryData;

  const totalPages = Math.ceil(total_breweries.count / PAGE_SIZE);

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        mb={2}
      >
        <Box>
          <Typography color="secondary" fontWeight="600" variant="subtitle1">
            Explore
          </Typography>
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{ textTransform: "capitalize" }}
          >
            {category} Breweries
          </Typography>
        </Box>
        <Box>
          {category === "list" && (
            <SortMenu setFilterListBy={setFilterListBy} />
          )}
        </Box>
      </Box>
      <ExploreTabs explore="Breweries" category={category} tabs={TABS}>
        <BreweryList
          sorted_list={sorted_list}
          category={category}
          filterListBy={filterListBy}
        />
      </ExploreTabs>
      <Box mt={3} display="flex" justifyContent="center">
        <ExplorePagination
          totalPages={totalPages}
          currentPage={page}
          category={category}
          path="breweries"
        />
      </Box>
    </Box>
  );
};

export default Breweries;
