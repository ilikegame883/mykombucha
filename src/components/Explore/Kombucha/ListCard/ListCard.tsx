import Link from "next/link";
import { Avatar, Rating, Grid, Box, Typography, useTheme } from "@mui/material";
import RevealText from "../../../RevealText";
import getCloudinaryUrl from "../../../../lib/cloudinary/getCloudinaryUrl";
import { KombuchaData } from "../../../../types/api";

interface ListCardProps {
  sorted_list: KombuchaData[];
  category: string;
}
//Card component for /kombucha/explore/[category] page for categories = Top Rated, New, Popular
const ListCard = ({ sorted_list, category }: ListCardProps) => {
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
              <Box mb={{ xs: 1.5, sm: 0 }} pr={{ xs: 0, sm: 15 }}>
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
                  <RevealText text={item.description} maxLength={70} />
                </Box>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  textAlign: "right",
                }}
              >
                <Typography variant="body1" align="right" fontWeight={600}>
                  {item.rating_avg ? item.rating_avg.toFixed(2) : "N/A"}
                </Typography>
                <Rating
                  size="small"
                  value={item.rating_avg}
                  readOnly
                  precision={0.25}
                />
                {category === "new" ? (
                  <Typography
                    variant="caption"
                    component="p"
                    color="text.secondary"
                  >
                    {item.createdAt.slice(0, item.createdAt.lastIndexOf("T"))}
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
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default ListCard;
