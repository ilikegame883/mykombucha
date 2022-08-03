import { styled } from "@mui/material/styles";
import {
  Typography,
  Box,
  useMediaQuery,
  Container,
  useTheme,
} from "@mui/material";
import HeroSearchBar from "./HeroSearchBar";

const RootStyle = styled("div")(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.down("lg")]: {
    height: 380,
  },
  height: 520,
  backgroundImage: `url("/static/images/hero.png")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  "&:after": {
    position: "absolute",
    content: '" "',
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    background: "#161c2d",
    opacity: 0.15,
  },
}));

const Hero = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <RootStyle>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "flex-start",
          zIndex: 3,
        }}
      >
        <Box width={1}>
          <Box mb={2.5}>
            <Typography
              variant={matches ? "h3" : "h4"}
              color="text.primary"
              fontWeight="700"
            >
              Find, rate, and share
            </Typography>
            <Typography
              variant={matches ? "h3" : "h4"}
              color="text.primary"
              fontWeight="700"
              mb={1.5}
            >
              your favorite{" "}
              <Typography
                color="secondary"
                variant={matches ? "h3" : "h4"}
                component="span"
                fontWeight="800"
              >
                Kombucha.
              </Typography>
            </Typography>
            <Typography
              variant={matches ? "h6" : "subtitle1"}
              color="text.secondary"
            >
              Online resource and community for kombucha enthusists.
            </Typography>
          </Box>
          <HeroSearchBar />
        </Box>
      </Container>
    </RootStyle>
  );
};

export default Hero;
