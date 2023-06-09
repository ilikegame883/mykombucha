import { Container, Typography, Box } from "@mui/material";
import { MainLayout } from "../../src/components/Layout";

const LocalPage = () => {
  return (
    <MainLayout title="Local breweries near your area">
      <Container maxWidth="sm" sx={{ py: { xs: 5, sm: 8 } }}>
        <Box px={2}>
          <Typography variant="h4" fontWeight="700" align="left" gutterBottom>
            Coming soon...
          </Typography>
          <Typography color="text.secondary" align="left" variant="subtitle1">
            Find local kombucha breweries and bars near you. Join our newsletter
            to stay on top of upcoming features!
          </Typography>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default LocalPage;
