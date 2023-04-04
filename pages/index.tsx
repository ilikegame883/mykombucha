import { Container, Box } from "@mui/material";
import { GetStaticProps } from "next";
import {
  Discover,
  ExploreSection,
  Hero,
  MobileApp,
  NewsLetter,
} from "../src/components/Landing";
import { MainLayout } from "../src/components/Layout";
import connectDB from "../src/lib/connectDB";
import { BreweryData, KombuchaData } from "../src/types/api";
import { getHomeSectionData } from "../src/utils/db-utils";

interface HomeProps {
  breweryData: BreweryData[];
  kombuchaData: KombuchaData[];
}

export default function Home({ breweryData, kombuchaData }: HomeProps) {
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

export const getStaticProps: GetStaticProps = async () => {
  await connectDB();

  const { exploreSectionData, topRatedKombucha } = await getHomeSectionData();

  const breweryData = JSON.parse(JSON.stringify(exploreSectionData));
  const kombuchaData = JSON.parse(JSON.stringify(topRatedKombucha));

  return {
    props: {
      breweryData,
      kombuchaData,
    },
    revalidate: 60,
  };
};
