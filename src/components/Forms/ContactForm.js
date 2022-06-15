import { Box, Stack, Typography } from "@mui/material";

const ContactForm = () => {
  return (
    <Stack spacing={4}>
      <Box px={2}>
        <Typography variant="h3" fontWeight="700" align="center" gutterBottom>
          Contact us
        </Typography>
        <Typography color="text.secondary" align="center" variant="subtitle1">
          <Typography component="span" fontWeight="700" color="secondary">
            myKombucha
          </Typography>{" "}
          does not produce kombucha nor do we forward emails to brewers. If you
          would like to contact a brewery, you can look them up through our{" "}
          <Typography
            component="a"
            color="secondary"
            href={"/search/breweries"}
            fontWeight="600"
          >
            search
          </Typography>{" "}
          feature.
        </Typography>
      </Box>
      <Box textAlign="center">
        <Typography variant="subtitle1" color="text.secondary">
          For all suggestions and all other enquiries reach us at:
        </Typography>
        <Typography
          component="a"
          href="mailto:admin@mykombucha.net"
          color="info.main"
          fontWeight="700"
        >
          admin@mykombucha.net
        </Typography>
      </Box>
    </Stack>
  );
};

export default ContactForm;
