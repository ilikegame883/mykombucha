import React, { useState } from "react";
import { Container } from "@mui/material";
import Layout from "../../src/components/Layout";
import { SearchLinkTabs, SearchTable } from "../../src/components/Search";

export const PAGE_SIZE = 5; //# of items for each page under tab

const SearchPage = ({ category }) => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 8 } }}>
        {/* //pass in category (params) from getServerSideProps for active style tab links
          //category will be used as value to match each page with individual tab link */}
        <SearchLinkTabs category={category}>
          <SearchTable category={category} />
        </SearchLinkTabs>
      </Container>
    </Layout>
  );
};

export default SearchPage;

export async function getServerSideProps(ctx) {
  const { category } = ctx.params;

  return {
    props: {
      category,
    },
  };
}
