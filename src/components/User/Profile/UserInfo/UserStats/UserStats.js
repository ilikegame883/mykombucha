import {
  useTheme,
  Box,
  Grid,
  Typography,
  Rating,
  Tooltip,
} from "@mui/material";
import getUserBadge from "../../../../../utils/getUserBadge";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const UserStats = ({ userData }) => {
  const { review_total, avg_rating } = userData;
  const theme = useTheme();

  const STATS = [
    {
      label: "Total Reviews",
      info: `Total Number of Reviews from ${userData.username}`,
      value: review_total,
    },
    getUserBadge(review_total),
    {
      label: "Avg Score Given",
      info: "Average score from all your ratings",
      value: (
        <Box display="flex" alignItems="center">
          <Rating
            size="small"
            value={avg_rating}
            readOnly
            precision={0.25}
            sx={{ color: "primary.main" }}
          />
          <Typography variant="body1" fontWeight="500" color="text.secondary">
            ({Boolean(avg_rating) ? avg_rating.toFixed(2) : "N/A"})
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box bgcolor={"alternate.main"}>
      <Grid container spacing={0}>
        {STATS.map((item, i) => (
          <Grid
            key={i}
            item
            xs={12}
            sm={4}
            sx={{
              borderRight: {
                xs: 0,
                sm: `1px solid ${theme.palette.divider}`,
              },
              borderBottom: {
                xs: `1px solid ${theme.palette.divider}`,
                sm: 0,
              },
              "&:last-child": {
                borderRight: 0,
                borderBottom: 0,
              },
            }}
          >
            <Box
              py={1.5}
              px={2}
              display="flex"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Box>
                <Box display="flex" alignItems="center" mb={0.5}>
                  <Typography color="text.primary" fontWeight="500" mr={0.5}>
                    {item.label}
                  </Typography>
                  <Tooltip title={item.info}>
                    <InfoOutlinedIcon
                      color="action"
                      sx={{ fontSize: "16px" }}
                    />
                  </Tooltip>
                </Box>
                <Typography
                  variant="h5"
                  component="div"
                  color="text.secondary"
                  fontWeight="500"
                >
                  {item.value}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserStats;
