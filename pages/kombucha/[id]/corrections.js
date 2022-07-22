import { useRouter } from "next/router";
import useSWR from "swr";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { MainLayout } from "../../../src/components/Layout/";
import LoadingIndicator from "../../../src/components/LoadingIndicator";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Corrections = () => {
  const router = useRouter();
  const { id: kombuchaId } = router.query;

  const { data: singleKombuchaData } = useSWR(
    kombuchaId && `/api/kombucha/${kombuchaId}`,
    fetcher
  );

  return (
    <MainLayout>
      {!singleKombuchaData ? (
        <LoadingIndicator />
      ) : (
        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Box component="header" mb={2}>
            <Typography variant="h6" color="secondary" gutterBottom>
              Send Correction For
            </Typography>
            <Typography variant="h4" color="text.primary" fontWeight="500">
              {singleKombuchaData[0].name}
            </Typography>
          </Box>
          <Box mb={4}>
            <Typography variant="body1" color="text.primary">
              <b>Brewery</b>:{" "}
              <Link href={`/brewery/${singleKombuchaData[0].brewery_slug}`}>
                <a style={{ color: "blue" }}>
                  {singleKombuchaData[0].brewery_name}
                </a>
              </Link>
            </Typography>
            <Typography variant="body1" color="text.primary">
              <b>Type</b>: {singleKombuchaData[0].product_type}
            </Typography>
            <Typography variant="body1" color="text.primary">
              <b>Alcohol Content</b>: {singleKombuchaData[0].ABV}%
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
              {singleKombuchaData[0].description}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              color="text.primary"
              fontWeight="700"
              gutterBottom
            >
              Select Correction:
            </Typography>
            Radio buttons, text field, email field, submit button goes here
          </Box>
        </Container>
      )}
    </MainLayout>
  );
};

export default Corrections;
