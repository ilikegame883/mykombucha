import { Container, Typography, Box } from "@mui/material";
import { MainLayout } from "../../src/components/Layout";

const LocalPage = () => {
  return (
    <MainLayout title="Local Breweries">
      <Container maxWidth="sm" sx={{ py: { xs: 5, sm: 8 } }}>
        <Box px={2}>
          <Typography variant="h4" fontWeight="700" align="left" gutterBottom>
            Coming soon...
          </Typography>
          <Typography color="text.secondary" align="left" variant="subtitle1">
            Browse local kombucha breweries near your area. Sign up to our
            newsletter for updates!
          </Typography>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default LocalPage;
