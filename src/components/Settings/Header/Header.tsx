import { useTheme } from "@mui/material/styles";
import { Container, Box, Typography, useMediaQuery } from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <header>
      <Box
        bgcolor="primary.main"
        pb={{ xs: 10, sm: 15 }}
        pt={{ xs: 10, sm: 13 }}
      >
        <Container>
          <Typography
            variant={isSm ? "h3" : "h4"}
            fontWeight="700"
            gutterBottom
            sx={{ color: "common.white" }}
          >
            Account settings
          </Typography>
          <Typography variant="h6" sx={{ color: "common.white" }}>
            Change your account information
          </Typography>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
