import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { Container } from "@mui/material";
import { Kombucha } from "../../../../src/components/Explore";
import { MainLayout } from "../../../../src/components/Layout";
import { KombuchaData, ReviewData } from "../../../../src/types/api";
import {
  getRecentKombuchaReviews,
  getNewKombucha,
  getTopAvgRatedKombucha,
  getPopularKombucha,
} from "../../../../src/utils/db-utils";

interface IParams {
  category?: string;
  page?: string;
}

export interface ExploreKombuchaPageProps extends IParams {
  exploreData: {
    sorted_list: ReviewData[] | KombuchaData[];
    total_kombucha: { count: number };
  };
}

//"Recent", "Top Rated", "New", "Popular Category Tabs
const ExploreKombuchaPage = ({
  exploreData,
  category,
  page,
}: ExploreKombuchaPageProps) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = ["recent", "top-rated", "new", "popular"];
  const params = categories.flatMap((category) => [
    { params: { category, page: "1" } },
    { params: { category, page: "2" } },
  ]);
  return {
    fallback: true, // Opt-in to on-demand generation for non-existent pages
    paths: params,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string;
  const page = params?.page as string;
  let data;

  switch (category) {
    case "recent":
      data = await getRecentKombuchaReviews(page);
      break;
    case "new":
      data = await getNewKombucha(page);
      break;
    case "top-rated":
      data = await getTopAvgRatedKombucha(page);
      break;
    case "popular":
      data = await getPopularKombucha(page);
      break;
  }

  const [exploreData] = JSON.parse(JSON.stringify(data));

  return {
    props: {
      category,
      page,
      exploreData,
    },
    revalidate: 30,
  };
};
