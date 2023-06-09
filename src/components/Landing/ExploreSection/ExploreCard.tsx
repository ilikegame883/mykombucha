import { Card, CardContent, Typography, Stack, Avatar } from "@mui/material";
import Link from "next/link";
import getCloudinaryUrl from "../../../lib/cloudinary/getCloudinaryUrl";

const ExploreCard = ({ brewery }) => {
  const { name, city, country, image, slug } = brewery;
  return (
    <Card sx={{ borderRadius: 2, m: { xs: 0.5, md: 1 } }} elevation={2}>
      <CardContent
        sx={{
          "&:last-child": {
            pb: 2,
          },
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            variant="square"
            alt={name}
            src={getCloudinaryUrl(image)}
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

            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight="600"
            >
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

export default ExploreCard;
