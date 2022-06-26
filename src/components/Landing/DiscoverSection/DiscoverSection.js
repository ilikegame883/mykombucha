import { Typography, Stack, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DiscoveryBreweryCard from "./DiscoverBreweryCard";
import Link from "next/link";

const DiscoverSection = ({ breweryList }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"), {
    defaultMatches: true,
  });
  const alignPosition = isSm ? "center" : "left";

  const settings = {
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <Box position="relative">
      <Stack
        direction="column"
        sx={{ position: "relative", textAlign: alignPosition }}
        pb={3}
      >
        <Typography
          variant="h6"
          color="secondary"
          fontWeight="800"
          gutterBottom
        >
          Discover
        </Typography>
        <Typography
          variant={isSm ? "h3" : "h4"}
          fontWeight="800"
          color="text.primary"
          gutterBottom
        >
          Discover New Breweries
        </Typography>
        <Typography variant={isSm ? "h6" : "subtitle1"} color="text.secondary">
          Learn more about your favorite breweries and {isSm && <br />} discover
          many types of kombucha that are being made by other breweries around
          the world.
        </Typography>
      </Stack>
      <Slider {...settings}>
        {breweryList.map((brewery) => (
          <Box key={brewery.name}>
            <DiscoveryBreweryCard brewery={brewery} />
          </Box>
        ))}
      </Slider>
      <Box position="absolute" right={10}>
        <Link href="/breweries/explore/list/1" passHref>
          <Typography
            variant="body2"
            component="a"
            color="primary.dark"
            fontWeight="600"
          >
            See more
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default DiscoverSection;
