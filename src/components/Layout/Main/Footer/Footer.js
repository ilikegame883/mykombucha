import { Grid, Box, Link, Typography, Divider, Stack } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <Box py={{ xs: 4, sm: 8 }}>
      <Grid container mb={1}>
        <Grid item xs={12} sm={4}>
          <Box
            display={"flex"}
            justifyContent={{ xs: "center", md: "flex-start" }}
            alignItems={"center"}
            height={1}
          >
            <Box
              component="a"
              href="/"
              title="myKombucha"
              width={200}
              mb={{ xs: 2, md: 0 }}
            >
              <Box
                component="img"
                src="https://res.cloudinary.com/jjo/image/upload/v1651018664/myKombucha/Logo/topbar-logo_ha3vu9.svg"
                height={1}
                width={1}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} order={{ xs: 3, sm: 2 }}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            height={1}
          >
            <InstagramIcon color="action" />
            <TwitterIcon color="action" />
            <FacebookIcon color="action" />
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          order={{ xs: 2, sm: 3 }}
          pb={{ xs: 2, sm: 0 }}
          pl={{ xs: 0, sm: 3 }}
          align="left"
        >
          <Box
            display={"flex"}
            alignItems={"flex-top"}
            justifyContent="space-evenly"
            width={1}
          >
            <Stack>
              <Box>
                <Typography
                  variant="body1"
                  component="div"
                  color="text.primary"
                  fontWeight="700"
                  gutterBottom
                >
                  Explore
                </Typography>
              </Box>
              <Link
                underline="none"
                component="a"
                href="/breweries/explore/list1"
                color="text.secondary"
                variant="subtitle2"
              >
                Breweries
              </Link>
              <Link
                underline="none"
                component="a"
                href="/kombucha/explore/list1"
                color="text.secondary"
                variant="subtitle2"
              >
                Kombucha
              </Link>
              <Link
                underline="none"
                component="a"
                href="/local"
                color="text.secondary"
                variant="subtitle2"
              >
                Local
              </Link>
            </Stack>
            <Stack>
              <Box>
                <Typography
                  variant="body1"
                  component="div"
                  color="text.primary"
                  fontWeight="700"
                  gutterBottom
                >
                  About
                </Typography>
              </Box>
              <Link
                underline="none"
                component="a"
                href="/"
                color="text.secondary"
                variant="subtitle2"
              >
                About Us
              </Link>
              <Link
                underline="none"
                component="a"
                href="/contact"
                color="text.secondary"
                variant="subtitle2"
              >
                Contact Us
              </Link>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
