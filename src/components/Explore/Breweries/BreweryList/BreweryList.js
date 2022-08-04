import Link from "next/link";
import {
  Avatar,
  Stack,
  Grid,
  Box,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import getCloudinaryUrl from "../../../../utils/getCloudinaryUrl";
import CustomChips from "../../../CustomChips";

const BreweryList = ({ breweryList, category, sort }) => {
  const theme = useTheme();

  const sortedList = () => {
    const cloneList = [...breweryList];

    switch (sort) {
      case "Recent":
        return breweryList;
      case "A-Z":
        const sortAsc = cloneList.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        return sortAsc;
      case "Z-A":
        const sortDes = cloneList.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          return 0;
        });
        return sortDes;
    }
  };

  return (
    <Box component={Paper} variant="outlined">
      <Grid container>
        {sortedList().map((item, i) => (
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
            <Box
              p={{ xs: 2, sm: 2.5 }}
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Box
                display="flex"
                alignItems="center"
                flexGrow={1}
                mb={{ xs: 1, sm: 0 }}
              >
                <Avatar
                  variant="square"
                  src={getCloudinaryUrl(item.image)}
                  alt={item.name}
                  sx={{ width: 60, height: 60 }}
                />
                <Box pl={2.5}>
                  <Link href={`/breweries/${item.slug}`} passHref>
                    <Typography
                      component="a"
                      variant="body1"
                      fontWeight="600"
                      color="text.primary"
                      sx={{
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>

                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    {item.city}, {item.country}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <Typography variant="body2" color="text.primary" pr={0.5}>
                      {item.type}
                    </Typography>
                    <CustomChips type={item.product_type} />
                  </Box>
                </Box>
              </Box>
              {category !== "popular" && (
                <Box position="absolute" right={20} top={18}>
                  <Typography variant="caption" color="text.secondary">
                    Added:{" "}
                    {item.insertTime.slice(0, item.insertTime.lastIndexOf("T"))}
                  </Typography>
                </Box>
              )}
              {category === "popular" && (
                <Box position="absolute" right={20} top={18}>
                  <Typography variant="body1" color="text.secondary">
                    {item.favorite_count}{" "}
                    <FavoriteIcon
                      color="primary"
                      fontSize="small"
                      sx={{ verticalAlign: "text-top" }}
                    />
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BreweryList;
