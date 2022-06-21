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
    height: 650,
  },
  height: 800,
  backgroundImage: `url("/static/images/hero-image.jpg")`,
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
    opacity: 0.75,
  },
}));

const Hero = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <RootStyle>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "flex-start",
          zIndex: 3,
          pb: 3,
        }}
      >
        <Box width={1}>
          <Box pb={3.5}>
            <Box width={{ sm: 460, md: 625 }} pb={1.5}>
              <Box
                component="img"
                src="https://res.cloudinary.com/mykombucha/image/upload/v1655511899/logo/hero-logo_nocv1z.svg"
                height={1}
                width={1}
              />
            </Box>

            <Typography
              variant={matches ? "h4" : "h5"}
              color="common.white"
              fontWeight="700"
            >
              Find, rate, and share your favorite
              <Typography
                color="primary"
                variant={matches ? "h4" : "h5"}
                component="div"
                fontWeight="700"
              >
                Kombucha
              </Typography>
            </Typography>
          </Box>
          <HeroSearchBar />
        </Box>
      </Container>

      <Box
        component={"svg"}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1920 100.1"
        width={1}
        maxHeight={120}
        bottom={-1}
        position={"absolute"}
        zIndex={2}
      >
        <path fill={"#F7F9FC"} d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z" />
      </Box>
    </RootStyle>
  );
};

export default Hero;
