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
      <MainLayout position="sticky">
        <Hero />
        <Container maxWidth="lg" sx={{ py: { xs: 10, sm: 15 } }}>
          <ExploreSection kombuchaList={kombuchaList} />
        </Container>
        <Box bgcolor="#fff">
          <Container maxWidth="lg" sx={{ py: { xs: 10, sm: 15 } }}>
            <DiscoverSection breweryList={breweryList} />
          </Container>
        </Box>
        <Container maxWidth="lg" sx={{ py: { xs: 10, sm: 15 } }}>
          <MobileApp />
        </Container>
        <Box bgcolor="#fff">
          <Container maxWidth="lg" sx={{ py: { xs: 10, sm: 15 } }}>
            <NewsLetter />
          </Container>
        </Box>
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
