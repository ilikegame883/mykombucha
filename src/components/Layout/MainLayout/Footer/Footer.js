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
    // <Box py={{ xs: 4, sm: 6 }}>
    //   <Container maxLength="lg">
    //     <Grid container mb={1}>
    //       <Grid item xs={12} sm={4}>
    //         <Box
    //           display={"flex"}
    //           justifyContent={{ xs: "center", md: "flex-start" }}
    //           alignItems={"center"}
    //           height={1}
    //         >
    //           <Box
    //             component="a"
    //             href="/"
    //             title="myKombucha"
    //             width={50}
    //             mb={{ xs: 2, md: 0 }}
    //           >
    //             <Box
    //               component="img"
    //               src="/static/favicons/android-chrome-192x192.png"
    //               height={1}
    //               width={1}
    //             />
    //           </Box>
    //         </Box>
    //       </Grid>
    //       <Grid item xs={12} sm={4} order={{ xs: 3, sm: 2 }}>
    //         <Stack
    //           direction="row"
    //           justifyContent="center"
    //           alignItems="center"
    //           spacing={2}
    //           height={1}
    //         >
    //           <InstagramIcon color="action" />
    //           <TwitterIcon color="action" />
    //           <FacebookIcon color="action" />
    //         </Stack>
    //       </Grid>
    //       <Grid
    //         item
    //         xs={12}
    //         sm={4}
    //         order={{ xs: 2, sm: 3 }}
    //         pb={{ xs: 2, sm: 0 }}
    //         pl={{ xs: 0, sm: 3 }}
    //         align="left"
    //       >
    //         <Box
    //           display={"flex"}
    //           alignItems={"flex-top"}
    //           justifyContent="space-evenly"
    //           width={1}
    //         >
    //           <Stack>
    //             <Box>
    //               <Typography
    //                 variant="h6"
    //                 component="div"
    //                 color="text.primary"
    //                 fontWeight="600"
    //               >
    //                 Explore
    //               </Typography>
    //             </Box>
    //             <Link
    //               underline="none"
    //               component="a"
    //               href="/breweries/explore/list/1"
    //               color="text.secondary"
    //               variant="subtitle2"
    //             >
    //               Breweries
    //             </Link>
    //             <Link
    //               underline="none"
    //               component="a"
    //               href="/kombucha/explore/list/1"
    //               color="text.secondary"
    //               variant="subtitle2"
    //             >
    //               Kombucha
    //             </Link>
    //             <Link
    //               underline="none"
    //               component="a"
    //               href="/local"
    //               color="text.secondary"
    //               variant="subtitle2"
    //             >
    //               Local
    //             </Link>
    //           </Stack>
    //           <Stack>
    //             <Box>
    //               <Typography
    //                 variant="h6"
    //                 component="div"
    //                 color="text.primary"
    //                 fontWeight="600"
    //               >
    //                 About
    //               </Typography>
    //             </Box>
    //             <Link
    //               underline="none"
    //               component="a"
    //               href="/"
    //               color="text.secondary"
    //               variant="subtitle2"
    //             >
    //               About Us
    //             </Link>
    //             <Link
    //               underline="none"
    //               component="a"
    //               href="/contact"
    //               color="text.secondary"
    //               variant="subtitle2"
    //             >
    //               Contact Us
    //             </Link>
    //           </Stack>
    //         </Box>
    //       </Grid>
    //     </Grid>
    //   </Container>
    //   <Divider />
    // </Box>
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

      <Grid item xs={12} sm={6} align={isSm ? "left" : "center"}>
        <Typography variant="caption" color="text.secondary">
          &copy; 2022 myKombucha. All rights reserved.
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
