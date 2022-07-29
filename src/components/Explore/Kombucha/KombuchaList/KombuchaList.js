import Link from "next/link";
import {
  Avatar,
  Rating,
  Stack,
  Grid,
  Box,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import RevealText from "../../../RevealText";
import getCloudinaryUrl from "../../../../utils/getCloudinaryUrl";

const KombuchaList = ({ kombuchaList, category }) => {
  const theme = useTheme();
  return (
    <Box component={Paper}>
      <Grid container>
        {kombuchaList.map((item, i) => (
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
                display={"flex"}
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
                        fontWeight="600"
                        sx={{
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {item.brewery_name} Brewery
                      </Typography>
                    </Link>
                  </Box>
                  <Box mb={{ xs: 1.5, sm: 0 }}>
                    <RevealText text={item.description} maxLength={75} />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  p={1.5}
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 10,
                    borderRadius: 10,
                  }}
                  alignItems="center"
                >
                  <Rating
                    size="small"
                    value={item.avg}
                    readOnly
                    precision={0.25}
                    sx={{ mr: 1 }}
                  />
                  <Typography
                    variant="body2"
                    color="text.primary"
                    fontWeight="500"
                  >
                    {item.avg ? item.avg.toFixed(2) : "N/A"}
                  </Typography>
                </Box>
                <Stack
                  alignItems="center"
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 20,
                  }}
                >
                  {category === "new" ? (
                    <Typography variant="caption" color="text.secondary">
                      Date added:{" "}
                      {item.insertTime.slice(
                        0,
                        item.insertTime.lastIndexOf("T")
                      )}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="500"
                    >
                      {item.review_count} ratings
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default KombuchaList;
