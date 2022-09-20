import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { MainLayout } from "../../../src/components/Layout/";
import CorrectionForm from "../../../src/components/Forms/CorrectionForm/CorrectionForm";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Corrections = () => {
  const router = useRouter();
  const { id: kombuchaId } = router.query;

  const { data: singleKombuchaData } = useSWR(
    kombuchaId && `/api/kombucha/${kombuchaId}`,
    fetcher
  );

  if (!singleKombuchaData) return <CircularProgress />;

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box component="header" mb={2}>
          <Typography variant="h6" color="secondary" gutterBottom>
            Send Correction For
          </Typography>
          <Typography variant="h4" color="text.primary" fontWeight="600">
            {singleKombuchaData[0].name}
          </Typography>
        </Box>
        <Box mb={4}>
          <Typography variant="body1" color="text.primary">
            <b>Brewery</b>:{" "}
            <Link
              href={`/breweries/${singleKombuchaData[0].brewery_slug}`}
              passHref
            >
              <Typography
                variant="body1"
                color="info.main"
                component="a"
                fontWeight="600"
              >
                {singleKombuchaData[0].brewery_name}
              </Typography>
            </Link>
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>Type</b>: {singleKombuchaData[0].product_type}
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>ABV</b>: {singleKombuchaData[0].ABV}%
          </Typography>
          <Typography variant="body1" color="text.primary">
            <b>Flavor</b>: {singleKombuchaData[0].flavor.join(", ")}
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
          <CorrectionForm name={singleKombuchaData[0].name} type="kombucha" />
        </Box>
      </Container>
    </MainLayout>
  );
};

export default Corrections;
