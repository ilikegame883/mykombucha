import { Rating, Stack, Box, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HorizontalStats = ({ singleBreweryData }) => {
  const { total_products, avg, favorite_count } = singleBreweryData;
  const theme = useTheme();

  return (
    <Box>
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            borderRight: {
              md: `1px solid ${theme.palette.divider}`,
            },
            borderBottom: {
              xs: `1px solid ${theme.palette.divider}`,
              md: 0,
            },
          }}
        >
          <Box
            sx={{
              p: 1.5,
              px: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="h6" color="text.secondary" fontWeight="600">
              {total_products}
            </Typography>
            <Typography variant="body1" color="text.primary" fontWeight="600">
              {total_products > 1 ? "Kombuchas" : "Kombucha"}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            borderBottom: {
              xs: `1px solid ${theme.palette.divider}`,
              md: 0,
            },
            borderRight: {
              md: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <Box
            sx={{
              p: 1.5,
              px: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Stack direction="row" alignItems="center" sx={{ height: 32 }}>
              <Rating
                value={avg}
                readOnly
                precision={0.25}
                sx={{ color: "primary.main" }}
              />
              {avg && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight="600"
                  ml={0.5}
                >
                  {" "}
                  ({avg})
                </Typography>
              )}
            </Stack>
            <Typography variant="body1" color="text.primary" fontWeight="600">
              Brewery Rating
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 1.5,
              px: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Stack direction="row" alignItems="center">
              <FavoriteIcon fontSize="small" color="primary" />
              <Typography
                variant="h6"
                color="text.secondary"
                fontWeight="600"
                ml={0.5}
              >
                {favorite_count === 0 ? "N/A" : favorite_count}
              </Typography>
            </Stack>
            <Typography variant="body1" color="text.primary" fontWeight="600">
              People Love This Brewery
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HorizontalStats;
