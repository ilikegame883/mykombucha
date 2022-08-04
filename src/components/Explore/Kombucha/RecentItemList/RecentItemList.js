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
import getCloudinaryUrl from "../../../../utils/getCloudinaryUrl";

const RecentItemList = ({ reviewList }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box component={Paper} variant="outlined">
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
                    src={getCloudinaryUrl(item.kombucha.image)}
                    alt={item.kombucha.name}
                    sx={{ width: 60, height: 60 }}
                  />
                </Box>
                <Stack mb={{ xs: 1, sm: 0 }} pr={{ xs: 0, sm: 10 }}>
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
                    <RevealText text={item.comment} maxLength={75} />
                  </Box>
                </Stack>

                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 20, sm: 30 },
                    right: 15,
                  }}
                >
                  <Link href={`/users/${item.username}`} passHref>
                    <Box component="a" display="flex" alignItems="center">
                      <Avatar
                        src={getCloudinaryUrl(item.userAvatar)}
                        alt={item.username}
                        sx={{ height: 40, width: 40 }}
                      />
                      <Typography
                        variant="body1"
                        color="text.primary"
                        pl={1}
                        fontWeight="600"
                      >
                        {item.username}
                        <Typography
                          variant="caption"
                          component="p"
                          color="text.secondary"
                        >
                          {item.insertTime.slice(
                            0,
                            item.insertTime.lastIndexOf("T")
                          )}
                        </Typography>
                      </Typography>
                    </Box>
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecentItemList;
