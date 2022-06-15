import React, { useState } from "react";
import BreweryList from "./BreweryList/BreweryList";
import BreweryLinkTabs from "./BreweryLinkTabs";

const PAGE_SIZE = 5; //# of items for each page under tab

const Breweries = ({ breweryData, category, page }) => {
  const [sort, setSort] = useState("Recent");

  //total = total number of sorted items
  const { total } = breweryData;

  const pageCount = Math.ceil(total.count / PAGE_SIZE);

  {
    /* //pass in category (params) from getServerSideProps to enable active styles for tab links
      //populate brewery list by matching category value with the explore tabs */
  }
  return (
    <BreweryLinkTabs
      category={category}
      currentPage={page}
      pageCount={pageCount}
      setSort={setSort}
    >
      <BreweryList
        breweryList={breweryData.sorted_list}
        category={category}
        sort={sort}
      />
    </BreweryLinkTabs>
  );
};

export default Breweries;
