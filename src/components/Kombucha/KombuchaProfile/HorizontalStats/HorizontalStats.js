import { Box, Grid, Typography, Chip, useTheme } from "@mui/material";

const HorizontalStats = ({ served_in, ABV, flavor }) => {
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
              py: 1.5,
              px: { xs: 2, sm: 3 },
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              color="text.primary"
              fontWeight="600"
              mr={1}
            >
              Served in:
            </Typography>
            {served_in.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                sx={{ mr: 0.5, fontWeight: 500, borderRadius: 2 }}
              />
            ))}
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
              px: { xs: 2, sm: 3 },
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body1" color="text.primary" fontWeight="600">
              Flavor:{" "}
              {flavor.map((f, idx) => (
                <Typography
                  key={f}
                  variant="body1"
                  component="span"
                  color="text.secondary"
                  fontWeight="500"
                >
                  {f}
                  {idx !== flavor.length - 1 && ","}{" "}
                </Typography>
              ))}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 1.5,
              px: { xs: 2, sm: 3 },
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body1" color="text.primary" fontWeight="600">
              ABV:{" "}
              <Typography
                variant="body1"
                component="span"
                color="text.secondary"
                fontWeight="600"
              >
                {ABV}%
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HorizontalStats;
