import Link from "next/link";
import {
  Grid,
  Box,
  Typography,
  Divider,
  Stack,
  useTheme,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid container spacing={1.5} alignItems="center">
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width={1}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
            <Box
              component="img"
              src="/static/favicons/android-chrome-192x192.png"
              height={30}
              width={30}
            />
            <Typography
              variant="h6"
              color="text.primary"
              fontWeight="700"
              ml={0.75}
            >
              myKombucha
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Box>
              <Link href="/breweries/explore/list/1" passHref>
                <Typography
                  component="a"
                  variant="body2"
                  color="text.primary"
                  fontWeight="600"
                >
                  Breweries
                </Typography>
              </Link>
            </Box>
            <Box ml={2}>
              <Link href="/kombucha/explore/recent/1" passHref>
                <Typography
                  component="a"
                  variant="body2"
                  color="text.primary"
                  fontWeight="600"
                >
                  Kombucha
                </Typography>
              </Link>
            </Box>
            {/* <Box ml={2}>
              <Link href="/about" passHref>
                <Typography
                  component="a"
                  variant="body2"
                  color="text.primary"
                  fontWeight="600"
                >
                  About
                </Typography>
              </Link>
            </Box> */}
            <Box ml={2}>
              <Link href="/contact" passHref>
                <Typography
                  component="a"
                  variant="body2"
                  color="text.primary"
                  fontWeight="600"
                >
                  Contact Us
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ textAlign: isSm ? "left" : "center" }}>
        <Typography variant="caption" color="text.secondary">
          &copy; 2023 myKombucha. All rights reserved.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack
          direction="row"
          justifyContent={{ xs: "center", sm: "flex-end" }}
          spacing={2}
        >
          <IconButton>
            <InstagramIcon />
          </IconButton>
          <IconButton>
            <TwitterIcon />
          </IconButton>
          <IconButton>
            <FacebookIcon />
          </IconButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Footer;
