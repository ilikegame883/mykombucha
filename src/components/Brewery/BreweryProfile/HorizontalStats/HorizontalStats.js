import {
  Container,
  Rating,
  Stack,
  Box,
  Grid,
  Card,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HorizontalStats = ({ breweryData }) => {
  const { total_products, avg, favorite_count } = breweryData;
  const STATS = [
    {
      value: total_products,
      label: "Kombuchas",
    },
    {
      value: (
        <Stack direction="row">
          <Rating
            value={avg}
            readOnly
            precision={0.25}
            sx={{ color: "primary.main" }}
          />
          {avg && (
            <Typography fontWeight="medium" color="text.secondary">
              ({avg})
            </Typography>
          )}
        </Stack>
      ),
      label: `Brewery Rating`,
    },
    {
      value: (
        <>
          <FavoriteIcon fontSize="small" sx={{ mr: 1 }} color="primary" />
          {favorite_count === 0 ? "N/A" : favorite_count}
        </>
      ),
      label: "People Love This Brewery",
    },
  ];

  const theme = useTheme();
  return (
    <Box>
      <Grid container>
        {STATS.map((item, i) => (
          <Grid
            key={i}
            item
            xs={12}
            md={4}
            sx={{
              borderRight: {
                xs: 0,
                md: `1px solid ${theme.palette.divider}`,
              },
              borderBottom: {
                xs: `1px solid ${theme.palette.divider}`,
                md: 0,
              },
              "&:last-child": {
                borderRight: 0,
              },
            }}
          >
            <Box
              sx={{
                p: 2,
                px: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Box>
                <Typography
                  variant={"h5"}
                  color={"text.secondary"}
                  fontWeight="700"
                  lineHeight={1}
                  gutterBottom
                >
                  {item.value}
                </Typography>
                <Typography
                  lineHeight={1}
                  color="text.primary"
                  fontWeight="500"
                >
                  {item.label}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HorizontalStats;
