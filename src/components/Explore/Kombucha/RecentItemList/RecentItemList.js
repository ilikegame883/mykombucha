import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Stack,
  Grid,
  Box,
  Typography,
  Paper,
  useMediaQuery,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RevealText from "../../../RevealText";

const RecentItemList = ({ reviewList }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  console.log(reviewList);
  return (
    <Box component={Paper}>
      <Grid container>
        {reviewList.map((item, i) => (
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
            <Box p={3} display="flex" alignItems="center">
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                flex={"1 1 100%"}
                alignItems={{ sm: "center" }}
              >
                <Box pr={2} mb={{ xs: 1, sm: 0 }} width={60} height={60}>
                  <Avatar
                    variant="square"
                    src={item.kombucha.image}
                    alt={item.kombucha.name}
                    sx={{ width: 1, height: 1 }}
                  />
                </Box>
                <Stack marginBottom={{ xs: 1, sm: 0 }} sx={{ flexGrow: 1 }}>
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
                  <Box pb={0.5}>
                    <Link
                      href={`/breweries/${item.kombucha.brewery_slug}`}
                      passHref
                    >
                      <Typography
                        variant="body2"
                        component="a"
                        color="text.primary"
                        sx={{
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {item.kombucha.brewery_name} Brewery
                      </Typography>
                    </Link>
                  </Box>
                  <Box sx={{ fontStyle: "italic" }} mb={0.5}>
                    <RevealText text={item.comment} maxLength={75} />
                  </Box>
                </Stack>
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 25, sm: 40 },
                    right: 15,
                  }}
                >
                  <Link href={`/users/${item.username}`} passHref>
                    <Box component="a" display="flex" alignItems="center">
                      <Avatar src={item.userAvatar} alt={item.username} />
                      <Typography
                        variant={isSm ? "h6" : "body1"}
                        color="text.primary"
                        fontWeight="500"
                        sx={{ pl: 1 }}
                      >
                        {item.username}
                      </Typography>
                    </Box>
                  </Link>
                </Box>
                <Typography
                  variant="caption"
                  color="text.primary"
                  sx={{ position: "absolute", bottom: 5, right: 10 }}
                >
                  Reviewed:{" "}
                  {item.insertTime.slice(0, item.insertTime.lastIndexOf("T"))}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecentItemList;
