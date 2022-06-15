import { Card, CardContent, Typography, Stack, Avatar } from "@mui/material";
import Link from "next/link";

const DiscoverBreweryCard = ({ brewery }) => {
  const { name, city, country, image, type, slug } = brewery;
  return (
    <Card sx={{ borderRadius: 2, m: { xs: 0.5, md: 1 } }} elevation={1}>
      <CardContent sx={{ pt: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            variant="square"
            alt={name}
            src={image}
            sx={{ height: 50, width: 50 }}
          />
          <Stack>
            <Link href={`/breweries/${slug}`} passHref>
              <Typography
                variant="body1"
                component="a"
                color="text.primary"
                fontWeight="700"
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {name}
              </Typography>
            </Link>

            <Typography variant="body2" color="text.secondary">
              {type}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {city}
              {", "}
              {country}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DiscoverBreweryCard;
