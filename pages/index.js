import { Container, Stack, Box } from "@mui/material";
import {
  DiscoverSection,
  ExploreSection,
  Hero,
  MobileApp,
  NewsLetter,
} from "../src/components/Landing";
import { MainLayout } from "../src/components/Layout";
import connectDB from "../src/lib/connectDB";
import getHomeStaticData from "../src/utils/getHomeStaticData";

export default function Home({ breweryList, kombuchaList }) {
  return (
    <Box>
      <MainLayout position="absolute" bgcolor="transparent">
        <Hero />
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Stack spacing={{ xs: 15, sm: 20 }} mb={5}>
            <ExploreSection kombuchaList={kombuchaList} />
            <DiscoverSection breweryList={breweryList} />
            <MobileApp />
            <NewsLetter />
          </Stack>
        </Container>
      </MainLayout>
    </Box>
  );
}

export const getStaticProps = async () => {
  //You should not call your Next.js API route within getStaticProps.
  //The reason is that your API route is not available until your Next app is built and getStaticProps runs at build time.
  //Therefore the API route would not be available to populate the data during the build.
  await connectDB();
  const { breweryList, kombuchaList } = await getHomeStaticData();
  return {
    props: {
      breweryList,
      kombuchaList,
    },
    revalidate: 15,
  };
};
