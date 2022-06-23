import { Container, Typography, Box } from "@mui/material";
import { MainLayout } from "../../src/components/Layout";

const LocalPage = () => {
  return (
    <MainLayout title="Local Breweries">
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Box px={2}>
          <Typography variant="h3" fontWeight="700" align="center" gutterBottom>
            Coming soon...
          </Typography>
          <Typography color="text.secondary" align="center" variant="subtitle1">
            Browse local kombucha breweries near your area
          </Typography>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default LocalPage;
