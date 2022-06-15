import { Container } from "@mui/material";
import Layout from "../../../../src/components/Layout";
import { getData } from "../../../../src/utils/fetchData";
import { Breweries } from "../../../../src/components/Explore";

export const PAGE_SIZE = 5; //# of items for each page under tab

const ExploreBreweries = ({ breweryData, category, page }) => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 8 } }}>
        <Breweries breweryData={breweryData} category={category} page={page} />
      </Container>
    </Layout>
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
