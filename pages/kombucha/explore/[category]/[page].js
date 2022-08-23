import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { Kombucha } from "../../../../src/components/Explore";
import { MainLayout } from "../../../../src/components/Layout";
import { getData } from "../../../../src/utils/fetchData";

const ExploreKombuchaPage = ({ exploreData, category, page }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: { xs: 5, sm: 8 } }}>
        <Kombucha exploreData={exploreData} category={category} page={page} />
      </Container>
    </MainLayout>
  );
};

export default ExploreKombuchaPage;

export async function getStaticPaths() {
  const categories = ["recent", "top-rated", "new", "popular"];
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
  const [exploreData] = await getData(`kombucha/explore/${category}/${page}`);

  return {
    props: {
      category,
      page,
      exploreData,
    },
    revalidate: 15,
  };
}
