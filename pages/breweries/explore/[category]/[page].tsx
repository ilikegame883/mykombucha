import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { Container } from "@mui/material";
import { Breweries } from "../../../../src/components/Explore";
import { MainLayout } from "../../../../src/components/Layout";
import { BreweryData } from "../../../../src/types/api";
import {
  getRecentBreweries,
  getPopularBreweries,
} from "../../../../src/utils/db-utils";
import connectDB from "../../../../src/lib/connectDB";

interface IParams {
  category: string;
  page?: string;
}

export interface ExploreBreweriesProps extends IParams {
  sorted_list: BreweryData[];
  total_breweries?: { count: number };
}

const ExploreBreweries = ({
  sorted_list,
  total_breweries,
  category,
  page,
}: ExploreBreweriesProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: { xs: 5, sm: 8 } }}>
        <Breweries
          sorted_list={sorted_list}
          total_breweries={total_breweries}
          category={category}
          page={page}
        />
      </Container>
    </MainLayout>
  );
};

export default ExploreBreweries;

export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();
  const categories = ["list", "popular"];
  //generate pages 1 and 2 (most common pages) for each category
  //remaining pages will generate when they are accessed for first time
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

  const categoryFunctions = {
    list: getRecentBreweries,
    popular: getPopularBreweries,
  };

  const data = await categoryFunctions[category](page);
  const [exploreBreweryData] = JSON.parse(JSON.stringify(data));
  const { sorted_list, total_breweries } = exploreBreweryData;
  return {
    props: {
      category,
      page,
      sorted_list,
      total_breweries,
    },
    revalidate: 60,
  };
};
