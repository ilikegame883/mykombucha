import { getSession } from "next-auth/react";
import { Container, Stack, Box } from "@mui/material";
import { getData } from "./../src/utils/fetchData";
import {
  DiscoverSection,
  ExploreSection,
  Hero,
  MobileApp,
  NewsLetter,
} from "../src/components/Landing";
import Layout from "../src/components/Layout";

export default function Home({ kombuchaList, breweryList, session }) {
  return (
    <Box>
      <Layout position="absolute" bgcolor="transparent">
        <Hero />
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Stack spacing={20} mb={5}>
            <DiscoverSection breweryList={breweryList} />
            <ExploreSection kombuchaList={kombuchaList} />
            <MobileApp />
            <NewsLetter />
          </Stack>
        </Container>
      </Layout>
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  //server side rendering
  const kombuchaList = await getData("kombucha");
  const breweryList = await getData("breweries");
  const session = await getSession(ctx);
  return {
    props: {
      kombuchaList,
      breweryList,
      session,
    },
  };
}
