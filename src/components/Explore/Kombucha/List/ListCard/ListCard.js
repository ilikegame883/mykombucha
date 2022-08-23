import Link from "next/link";
import { Avatar, Rating, Grid, Box, Typography, useTheme } from "@mui/material";
import RevealText from "../../../../../components/RevealText";
import getCloudinaryUrl from "../../../../../utils/getCloudinaryUrl";

//Card component for /kombucha/explore/[category] page for categories = Top Rated, New, Popular
const ListCard = ({ sorted_list, category }) => {
  const theme = useTheme();
  return (
    <>
      {sorted_list.map((item, i) => (
        <Grid
          item
          xs={12}
          key={i}
          sx={{
            position: "relative",
            borderBottom: `1px solid ${theme.palette.divider}`,
            "&:last-child": {
              borderBottom: 0,
            },
          }}
        >
          <Box py={2} px={2.5} display="flex" alignItems="center">
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              flex={"1 1 100%"}
              alignItems={{ sm: "center" }}
            >
              <Box pr={2} mb={{ xs: 1, sm: 0 }}>
                <Avatar
                  variant="square"
                  src={getCloudinaryUrl(item.image)}
                  alt={item.name}
                  sx={{ width: 60, height: 60 }}
                />
              </Box>
              <Box mb={{ xs: 1.5, sm: 0 }}>
                <Box>
                  <Link href={`/kombucha/${item._id}`} passHref>
                    <Typography
                      component="a"
                      variant="subtitle1"
                      fontWeight="700"
                      color="text.primary"
                    >
                      {item.name}
                    </Typography>
                  </Link>
                </Box>
                <Box mb={{ xs: 1, sm: 0.5 }}>
                  <Link href={`/breweries/${item.brewery_slug}`} passHref>
                    <Typography
                      component="a"
                      variant="body2"
                      color="text.secondary"
                      fontWeight="500"
                      sx={{
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {item.brewery_name} Brewery
                    </Typography>
                  </Link>
                </Box>
                <Box mb={{ xs: 0, sm: 0 }}>
                  <RevealText text={item.description} maxLength={75} />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                sx={{
                  position: "absolute",
                  top: { xs: 20, sm: 15 },
                  right: 20,
                }}
              >
                <Typography variant="h6" align="end">
                  {item.avg ? item.avg.toFixed(2) : "N/A"}
                </Typography>
                <Rating
                  size="small"
                  value={item.avg}
                  readOnly
                  precision={0.25}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 10, sm: 15 },
              right: 20,
            }}
          >
            {category === "new" ? (
              <Typography variant="caption" color="text.secondary">
                Added:{" "}
                {item.insertTime.slice(0, item.insertTime.lastIndexOf("T"))}
              </Typography>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="500"
                align="right"
              >
                {item.review_count}{" "}
                {item.review_count > 1 ? "ratings" : "rating"}
              </Typography>
            )}
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default ListCard;
