import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { getData } from "../../../../src/utils/fetchData";
import { Breweries } from "../../../../src/components/Explore";
import { MainLayout } from "../../../../src/components/Layout";

const ExploreBreweries = ({ exploreBreweryData, category, page }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: { xs: 5, sm: 8 } }}>
        <Breweries
          exploreBreweryData={exploreBreweryData}
          category={category}
          page={page}
        />
      </Container>
    </MainLayout>
  );
};

export default ExploreBreweries;

export async function getStaticPaths() {
  const categories = ["popular", "list"];
  //generate pages 1 and 2 (most common pages) for each category
  //remaining pages will generate when they are accessed for first time
  const params = categories.map(
    (category) => (
      { params: { category, page: "1" } }, { params: { category, page: "2" } }
    )
  );
  return {
    fallback: true, // Opt-in to on-demand generation for non-existent pages
    paths: params,
  };
}

export async function getStaticProps(ctx) {
  const { category, page } = ctx.params;

  const [exploreBreweryData] = await getData(
    `breweries/explore/${category}/${page}`
  );

  return {
    props: {
      category,
      page,
      exploreBreweryData,
    },
    revalidate: 15,
  };
}
