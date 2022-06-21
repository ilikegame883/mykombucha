import { Container, Typography, Box } from "@mui/material";
import Layout from "../../src/components/Layout";

const LocalPage = () => {
  return (
    <Layout title="Local Breweries">
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
    </Layout>
  );
};

export default LocalPage;
