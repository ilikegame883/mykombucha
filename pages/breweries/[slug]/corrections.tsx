import { GetServerSideProps } from "next";
import { Box, Container, Typography } from "@mui/material";
import { MainLayout } from "../../../src/components/Layout";
import CorrectionForm from "../../../src/components/Forms/CorrectionForm";
import { getBreweryBySlug } from "../../../src/utils/db-utils";

const Corrections = ({ singleBreweryData }) => {
  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box component="header" mb={2}>
          <Typography variant="h6" color="secondary" gutterBottom>
            Send Correction For
          </Typography>
          <Typography variant="h4" color="text.primary" fontWeight="600">
            {singleBreweryData.name} Brewery
          </Typography>
        </Box>
        <Box mb={4}>
          <Typography variant="body1" color="text.primary">
            <b>Name</b>: {singleBreweryData.name}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>Brewery Type</b>: {singleBreweryData.brewery_type}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>Location</b>: {singleBreweryData.city},{" "}
            {singleBreweryData.country}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>Styles Offered</b>: {singleBreweryData.kombucha_type}
          </Typography>
        </Box>
        <Box mb={4}>
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight="700"
            gutterBottom
          >
            Description:
          </Typography>
          <Typography
            variant="body2"
            color="text.primary"
            p={1.5}
            sx={{
              border: "1px solid #bdbdbd",
              borderRadius: 1,
              bgcolor: "#F5F5F5",
            }}
          >
            {singleBreweryData.description}
          </Typography>
        </Box>
        <Box>
          <CorrectionForm name={singleBreweryData.name} type="brewery" />
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Corrections;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  const data = await getBreweryBySlug(slug);
  const [singleBreweryData] = JSON.parse(JSON.stringify(data));

  return {
    props: {
      singleBreweryData,
    },
  };
};
