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

export default function Home({ kombuchaList, breweryList }) {
  return (
    <Box>
      <Layout position="absolute" bgcolor="transparent">
        <Hero />
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Stack spacing={{ xs: 15, sm: 20 }} mb={5}>
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

// export async function getServerSideProps(ctx) {
//   //server side rendering

//   const session = await getSession(ctx);
//   return {
//     props: {
//       session,
//     },
//   };
// }

export const getStaticProps = async () => {
  const kombuchaList = await getData("kombucha");
  const breweryList = await getData("breweries");

  return {
    props: {
      kombuchaList,
      breweryList,
    },
    revalidate: 15,
  };
};
