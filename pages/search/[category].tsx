import { useState } from "react";
import { Container } from "@mui/material";
import { GetServerSideProps } from "next";
import { SearchLinkTabs, SearchTable } from "../../src/components/Search";
import { MainLayout } from "../../src/components/Layout";
import { getData } from "../../src/utils/fetch-utils";
import { BreweryData, KombuchaData } from "../../src/types/api";

interface SearchPageProps {
  category: string;
  navBarSearchQuery: string;
  kombuchaData: KombuchaData[];
  breweryData: BreweryData[];
}

const SearchPage = ({
  category,
  navBarSearchQuery,
  kombuchaData,
  breweryData,
}: SearchPageProps) => {
  const [searchBar, setSearchBar] = useState(navBarSearchQuery || "");
  const [kombuchaTabCount, setKombuchaTabCount] = useState(
    kombuchaData?.length || 0
  );
  const [breweryTabCount, setBreweryTabCount] = useState(
    breweryData?.length || 0
  );

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: { xs: 5, sm: 8 } }}>
        <SearchLinkTabs
          category={category}
          searchBar={searchBar}
          kombuchaTabCount={kombuchaTabCount}
          breweryTabCount={breweryTabCount}
        >
          <SearchTable
            category={category}
            searchBar={searchBar}
            setSearchBar={setSearchBar}
            setKombuchaTabCount={setKombuchaTabCount}
            setBreweryTabCount={setBreweryTabCount}
          />
        </SearchLinkTabs>
      </Container>
    </MainLayout>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  const category = params?.category as string;

  if (query?.search) {
    const kombuchaData = await getData("kombucha/search", `${query?.search}`);
    const breweryData = await getData("breweries/search", `${query?.search}`);
    return {
      props: {
        category,
        kombuchaData,
        breweryData,
        navBarSearchQuery: query?.search,
      },
    };
  }
  return {
    props: {
      category,
    },
  };
};
