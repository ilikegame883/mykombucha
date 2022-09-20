import { Container, Box } from "@mui/material";
import {
  Discover,
  ExploreSection,
  Hero,
  MobileApp,
  NewsLetter,
} from "../src/components/Landing";
import { MainLayout } from "../src/components/Layout";
import connectDB from "../src/lib/connectDB";
import getHomeStaticData from "../src/utils/getHomeStaticData";

export default function Home({ breweryData, kombuchaData }) {
  return (
    <Box>
      <MainLayout position="sticky">
        <Hero />
        <Container maxWidth="lg" sx={{ py: { xs: 10, sm: 15 } }}>
          <Discover kombuchaData={kombuchaData} />
        </Container>
        <Container maxWidth="lg" sx={{ py: { xs: 10, sm: 15 } }}>
          <ExploreSection breweryData={breweryData} />
        </Container>
        <Container maxWidth="lg" sx={{ py: { xs: 10, sm: 20 } }}>
          <MobileApp />
        </Container>
        <Container maxWidth="lg" sx={{ py: { xs: 10, sm: 20 } }}>
          <NewsLetter />
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
  const { breweryData, kombuchaData } = await getHomeStaticData();
  return {
    props: {
      breweryData,
      kombuchaData,
    },
    revalidate: 15,
  };
};
