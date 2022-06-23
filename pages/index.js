import { Container, Stack, Box } from "@mui/material";
import { getData } from "./../src/utils/fetchData";
import {
  DiscoverSection,
  ExploreSection,
  Hero,
  MobileApp,
  NewsLetter,
} from "../src/components/Landing";
// import connectDB from "../src/lib/connectDB";
// import Brewery from "../src/models/breweryModel";
import { MainLayout } from "../src/components/Layout";

export default function Home() {
  return (
    <Box>
      <MainLayout position="absolute" bgcolor="transparent">
        <Hero />
        <Container maxWidth="lg" sx={{ py: 10 }}>
          <Stack spacing={{ xs: 15, sm: 20 }} mb={5}>
            {/* <DiscoverSection breweryList={breweryList} />
            <ExploreSection kombuchaList={kombuchaList} /> */}
            <MobileApp />
            <NewsLetter />
          </Stack>
        </Container>
      </MainLayout>
    </Box>
  );
}

// export const getStaticProps = async () => {
//   await connectDB();
//   //when more data is avaiable, fetch breweries documents based on popularity (number of hearts given)
//   // lean converts mongoose.Document to Plain Javascript Object
//   const result = await Brewery.find().limit(8).lean();

//   const breweryList = result.map((doc) => {
//     doc._id = doc._id.toString();
//     doc.updatedAt = doc.updatedAt.toString();
//     return doc;
//   });

//   const kombuchaList = await getData("kombucha/top");

//   return {
//     props: {
//       breweryList,
//       kombuchaList,
//     },
//     revalidate: 15,
//   };
// };
