import { useRouter } from "next/router";
import useSWR from "swr";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { MainLayout } from "../../../src/components/Layout";
import CorrectionForm from "../../../src/components/Forms/CorrectionForm";

const Corrections = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: singleBrewerydata } = useSWR(slug && `/api/breweries/${slug}`);

  if (!singleBrewerydata) return <CircularProgress />;

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box component="header" mb={2}>
          <Typography variant="h6" color="secondary" gutterBottom>
            Send Correction For
          </Typography>
          <Typography variant="h4" color="text.primary" fontWeight="600">
            {singleBrewerydata[0].name} Brewery
          </Typography>
        </Box>
        <Box mb={4}>
          <Typography variant="body1" color="text.primary">
            <b>Name</b>: {singleBrewerydata[0].name}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>Brewery Type</b>: {singleBrewerydata[0].brewery_type}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>Location</b>: {singleBrewerydata[0].city},{" "}
            {singleBrewerydata[0].country}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>Styles Offered</b>:{" "}
            {singleBrewerydata[0].kombucha_type.join(", ")}
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
            {singleBrewerydata[0].description}
          </Typography>
        </Box>
        <Box>
          <CorrectionForm name={singleBrewerydata[0].name} type="brewery" />
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Corrections;
