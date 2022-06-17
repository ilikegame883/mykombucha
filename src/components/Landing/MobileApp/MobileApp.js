import Image from "next/image";
import { Stack, Typography, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MobileApp = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"), {
    defaultMatches: true,
  });
  const alignPosition = isSm ? "center" : "left";
  return (
    <Stack alignItems="center">
      <Box sx={{ textAlign: alignPosition }}>
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
          fontWeight="800"
          color="text.primary"
          gutterBottom
        >
          Mobile App Coming Soon
        </Typography>
        <Typography variant={isSm ? "h6" : "subtitle1"} color="text.secondary">
          Browse and share your kombucha experiences from wherever you go.
          {isSm && <br />} Sign up for our newsletter to be notified when our
          mobile app is released.
        </Typography>
      </Box>
      <Box
        width={{ xs: 200, md: 450 }}
        height={{ xs: 350, md: 480 }}
        position="relative"
      >
        <Image
          src="https://res.cloudinary.com/jjo/image/upload/v1650773876/myKombucha/Logo/mockup_dg8sjr.png"
          alt="google play"
          layout="fill"
          objectFit="contain"
        />
      </Box>
      <Image
        src="https://res.cloudinary.com/jjo/image/upload/v1650763471/myKombucha/Logo/apple-google-logo_tjv1by.svg"
        alt="app store"
        width={360}
        height={120}
      />
    </Stack>
  );
};

export default MobileApp;
