import { Container } from "@mui/material";
import { Kombucha } from "../../../../src/components/Explore";
import Layout from "../../../../src/components/Layout";
import { getData } from "../../../../src/utils/fetchData";

const ExploreKombucha = ({ recentReviews, kombuchaData, category, page }) => {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 8 } }}>
        <Kombucha
          recentReviews={recentReviews}
          kombuchaData={kombuchaData}
          category={category}
          page={page}
        />
      </Container>
    </Layout>
  );
};

export default ExploreKombucha;

export async function getServerSideProps(ctx) {
  const { category, page } = ctx.params;

  //Data for recent (recent reviews) tab page will be fetched from Reviews collection
  if (ctx.params.category === "recent") {
    const [recentReviews] = await getData(
      `kombucha/explore/${category}/${page}`
    );

    return {
      props: {
        category,
        page,
        recentReviews,
      },
    };
  }
  //Sorted kombucha data for new, toprated, popular tab contents
  const [kombuchaData] = await getData(`kombucha/explore/${category}/${page}`);

  return {
    props: {
      category,
      page,
      kombuchaData,
    },
  };
}
