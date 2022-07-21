import { Box, Grid, Typography, Chip } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const HorizontalStats = ({ served_in, ABV }) => {
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
              px: 4,
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

            <Chip label={served_in} size="small" sx={{ mr: 1 }} />
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
              px: 4,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body1" color="text.primary" fontWeight="600">
              Flavors:{" "}
              <Typography
                variant="body1"
                component="span"
                color="text.secondary"
                fontWeight="600"
              >
                Peach
              </Typography>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              p: 1.5,
              px: 4,
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
                {ABV ? `${ABV}%` : "N/A"}
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HorizontalStats;
