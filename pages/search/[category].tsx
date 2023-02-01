import { Container } from "@mui/material";
import { SearchLinkTabs, SearchTable } from "../../src/components/Search";
import { MainLayout } from "../../src/components/Layout";
import { getData } from "../../src/utils/fetch-utils";

export const PAGE_SIZE = 5; //# of items for each page under category tab

//TODO: Refactor Search Page
const SearchPage = () => {
  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: { xs: 5, sm: 8 } }}>
        {/* <SearchLinkTabs
          category={category}
          getSearchResultCount={getSearchResultCount}
        >
          <SearchTable category={category} />
        </SearchLinkTabs> */}
      </Container>
    </MainLayout>
  );
};

export default SearchPage;

// export async function getServerSideProps(ctx) {
//   let getSearchResultCount;
//   const { category } = ctx.params;
//   if (ctx.query?.search && category === "kombucha") {
//     //by default, when user submits a search with the nav search bar-
//     //it will direct them to /search/kombucha/${query_str} page
//     //use the query str to check if results are available for the other tab page - "Breweries"
//     //return search result count to display in SearchLinkTabs Component
//     const { search } = ctx.query?.search && ctx.query;
//     const brewerySearchData = await getData("breweries/search", `${search}`);
//     getSearchResultCount = brewerySearchData.length;
//     return {
//       props: {
//         category,
//         getSearchResultCount,
//       },
//     };
//   }
//   return {
//     props: {
//       category,
//     },
//   };
// }
