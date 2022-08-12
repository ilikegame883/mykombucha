import { Box, Button, Typography, Container } from "@mui/material";
import Link from "next/link";

const Custom404 = () => {
  return (
    <Box height={"100vh"} display="flex" alignItems="center">
      <Container
        maxWidth="sm"
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h1" fontWeight="600">
          404
        </Typography>
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          align="center"
        >
          Oops! Looks like you followed a bad link.
        </Typography>
        <Box mt={2}>
          <Link href="/" passHref>
            <Button
              component="a"
              color="secondary"
              variant="contained"
              size="large"
            >
              Return Home
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Custom404;
