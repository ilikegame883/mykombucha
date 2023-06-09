import Link from "next/link";
import { GetServerSideProps } from "next";
import { Box, Container, Typography } from "@mui/material";
import { MainLayout } from "../../../src/components/Layout";
import CorrectionForm from "../../../src/components/Forms/CorrectionForm/CorrectionForm";
import { getKombuchaById } from "../../../src/utils/db-utils";
import connectDB from "../../../src/lib/connectDB";

const Corrections = ({ singleKombuchaData }) => {
  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box component="header" mb={2}>
          <Typography variant="h6" color="secondary" gutterBottom>
            Send Correction For
          </Typography>
          <Typography variant="h4" color="text.primary" fontWeight="600">
            {singleKombuchaData.name}
          </Typography>
        </Box>
        <Box mb={4}>
          <Typography variant="body1" color="text.primary">
            <b>Brewery</b>:{" "}
            <Link
              href={`/breweries/${singleKombuchaData.brewery_slug}`}
              passHref
            >
              <Typography
                variant="body1"
                color="info.main"
                component="a"
                fontWeight="600"
              >
                {singleKombuchaData.brewery_name}
              </Typography>
            </Link>
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>Type</b>: {singleKombuchaData.kombucha_type}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>ABV</b>: {singleKombuchaData.ABV}%
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>Flavor</b>: {singleKombuchaData.flavor.join(", ")}
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
              bgcolor: "#F7F9FC",
            }}
          >
            {singleKombuchaData.description}
          </Typography>
        </Box>
        <Box>
          <CorrectionForm name={singleKombuchaData.name} type="kombucha" />
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Corrections;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  await connectDB();

  const id = params?.id as string;

  const data = await getKombuchaById(id);
  const singleKombuchaData = JSON.parse(JSON.stringify(data));

  return {
    props: {
      singleKombuchaData,
    },
  };
};
