import Link from "next/link";
import { Avatar, Stack, Grid, Box, Typography, useTheme } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RevealText from "../../../RevealText";
import getCloudinaryUrl from "../../../../lib/cloudinary/getCloudinaryUrl";
import { RecentReview, ReviewData } from "../../../../types/api";

interface RecentListCardProps {
  sorted_list: ReviewData[];
}

//Card component for /kombucha/explore/[category] page for category "recent"
const RecentListCard = ({ sorted_list }: RecentListCardProps) => {
  const theme = useTheme();
  return (
    <>
      {sorted_list.map((item, i) => {
        return (
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
            <Box px={2.5} py={2} display="flex" alignItems="center">
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                flex={"1 1 100%"}
                alignItems={{ sm: "center" }}
              >
                <Box pr={2} mb={{ xs: 1, sm: 0 }}>
                  <Avatar
                    variant="square"
                    src={getCloudinaryUrl(item.kombucha.image || "")}
                    alt={item.kombucha.name}
                    sx={{ width: 60, height: 60 }}
                  />
                </Box>
                <Stack mb={{ xs: 1, sm: 0 }} maxWidth={600}>
                  <Box>
                    <Link href={`/kombucha/${item.kombucha._id}`} passHref>
                      <Typography
                        component="a"
                        variant="subtitle1"
                        color="text.primary"
                        fontWeight="700"
                        sx={{
                          textDecoration: "none",
                        }}
                      >
                        {item.kombucha.name} -
                        <StarIcon
                          color="primary"
                          fontSize="small"
                          sx={{ verticalAlign: "sub" }}
                        />
                        {item.rating}
                      </Typography>
                    </Link>
                  </Box>
                  <Box mb={0.5}>
                    <Link
                      href={`/breweries/${item.kombucha.brewery_slug}`}
                      passHref
                    >
                      <Typography
                        variant="body2"
                        component="a"
                        color="text.secondary"
                        fontWeight="500"
                        sx={{
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {item.kombucha.brewery_name} Brewery
                      </Typography>
                    </Link>
                  </Box>
                  <Box>
                    <RevealText text={item.comment} maxLength={70} />
                  </Box>
                </Stack>

                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 20, sm: 30 },
                    right: 15,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={getCloudinaryUrl(
                        item.review_author.profile?.image || ""
                      )}
                      alt={item.review_author.username}
                      sx={{ height: 40, width: 40 }}
                    />
                    <Box display="flex" flexDirection="column" pl={1}>
                      <Link href={`/users/${item.review_author._id}`} passHref>
                        <Typography
                          component="a"
                          variant="body1"
                          color="text.primary"
                          fontWeight="600"
                        >
                          {item.review_author.username}
                        </Typography>
                      </Link>

                      <Typography variant="caption" color="text.secondary">
                        {item.createdAt.slice(
                          0,
                          item.createdAt.lastIndexOf("T")
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        );
      })}
    </>
  );
};

export default RecentListCard;
