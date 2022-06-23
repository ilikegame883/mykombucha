import { Container } from "@mui/material";
import { getData } from "../../../../src/utils/fetchData";
import { Breweries } from "../../../../src/components/Explore";
import { MainLayout } from "../../../../src/components/Layout";

export const PAGE_SIZE = 5; //# of items for each page under tab

const ExploreBreweries = ({ breweryData, category, page }) => {
  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 8 } }}>
        <Breweries breweryData={breweryData} category={category} page={page} />
      </Container>
    </MainLayout>
  );
};

export default ExploreBreweries;

export async function getServerSideProps(ctx) {
  const { category, page } = ctx.params;

  const [breweryData] = await getData(`breweries/explore/${category}/${page}`);

  return {
    props: {
      category,
      page,
      breweryData,
    },
  };
}
