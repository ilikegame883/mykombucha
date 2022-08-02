import Image from "next/image";
import { Stack, Typography, Box, useMediaQuery, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MobileApp = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid container alignItems="center">
      <Grid item xs={12} sm={6} align="left">
        <Box>
          <Typography
            variant="h6"
            color="secondary"
            fontWeight="bold"
            gutterBottom
          >
            Get the app
          </Typography>
          <Typography
            variant={isSm ? "h3" : "h4"}
            fontWeight="700"
            color="text.primary"
            gutterBottom
          >
            Mobile App Coming Soon
          </Typography>
          <Typography
            variant={isSm ? "h6" : "subtitle1"}
            color="text.secondary"
          >
            Browse and share your kombucha experiences from wherever you go.
            Sign up for our newsletter to be notified when mobile app is
            released.
          </Typography>
        </Box>
        <Box ml={{ xs: 0, sm: -4 }}>
          <Image
            src="https://res.cloudinary.com/jjo/image/upload/v1650763471/myKombucha/Logo/apple-google-logo_tjv1by.svg"
            alt="app stores"
            width={360}
            height={120}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} align="center">
        <Box
          width={{ xs: 200, md: 450 }}
          height={{ xs: 350, md: 480 }}
          position="relative"
        >
          <Image
            src="https://res.cloudinary.com/jjo/image/upload/v1650773876/myKombucha/Logo/mockup_dg8sjr.png"
            alt="mobile"
            layout="fill"
            objectFit="contain"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default MobileApp;
