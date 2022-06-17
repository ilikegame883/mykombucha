import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Rating,
  Stack,
  Grid,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import RevealText from "../../../RevealText";

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
            <Box p={3} display="flex" alignItems="center">
              <Box
                display={"flex"}
                flexDirection={{ xs: "column", sm: "row" }}
                flex={"1 1 100%"}
                alignItems={{ sm: "center" }}
              >
                <Box pr={2} mb={{ xs: 1, sm: 0 }}>
                  <Avatar
                    variant="square"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 60, height: 60 }}
                  />
                </Box>
                <Box marginBottom={{ xs: 1, sm: 0 }} sx={{ flexGrow: 1 }}>
                  <Box>
                    <Link href={`/kombucha/${item._id}`} passHref>
                      <Typography
                        component="a"
                        variant="subtitle1"
                        fontWeight="700"
                        color="text.primary"
                        sx={{
                          textDecoration: "none",
                        }}
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
                        color={"text.primary"}
                        sx={{
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {item.brewery_name} Brewery
                      </Typography>
                    </Link>
                  </Box>
                  <RevealText text={item.description} maxLength={75} />
                </Box>
                <Box
                  display="flex"
                  // bgcolor="#F7F9FC"
                  p={1.5}
                  sx={{
                    position: "absolute",
                    top: { xs: 25, sm: 20 },
                    right: 10,
                    borderRadius: 10,
                  }}
                  alignItems="center"
                >
                  <Rating
                    value={item.avg}
                    readOnly
                    precision={0.25}
                    sx={{ mr: 1 }}
                  />
                  <Typography
                    variant="body1"
                    color="text.primary"
                    fontWeight="500"
                    // sx={{ lineHeight: 0 }}
                  >
                    {item.avg ? `${item.avg} / 5` : "N/A"}
                  </Typography>
                </Box>
                <Stack
                  alignItems="center"
                  spacing={1}
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 20,
                  }}
                >
                  {category === "new" ? (
                    <Typography variant="caption" color="text.primary">
                      Date added:{" "}
                      {item.insertTime.slice(
                        0,
                        item.insertTime.lastIndexOf("T")
                      )}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.primary"
                      fontWeight="600"
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
