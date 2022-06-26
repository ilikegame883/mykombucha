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
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProductTypeChips from "../../../Brewery/BreweryProfile/ProductTypeChips";

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
    <Box component={Paper}>
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
              display={"flex"}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Box display="flex" alignItems="center" flexGrow={1}>
                <Avatar
                  variant="square"
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 60, height: 60 }}
                />
                <Box pl={2.5}>
                  <Link href={`/breweries/${item.slug}`} passHref>
                    <Typography
                      component="a"
                      variant="body1"
                      fontWeight="700"
                      color="text.primary"
                      sx={{
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Link>
                  <Typography variant="body2">
                    {item.city}, {item.country}
                    <LocationOnOutlinedIcon
                      color="disabled"
                      fontSize="small"
                      sx={{ verticalAlign: "text-bottom" }}
                    />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.type}
                  </Typography>
                </Box>
              </Box>
              {category === "popular" && (
                <Box position="absolute" right={20} top={15}>
                  <Typography variant="body1" color="text.primary">
                    {item.favorite_count}{" "}
                    <FavoriteIcon
                      color="error"
                      fontSize="small"
                      sx={{ verticalAlign: "text-top" }}
                    />
                  </Typography>
                </Box>
              )}

              <Stack
                direction={{ xs: "row", sm: "column" }}
                alignItems={{ xs: "flex-start", sm: "flex-end" }}
                justifyContent={{ xs: "flex-end", sm: "center" }}
                spacing={1}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ display: { xs: "none", sm: "inline" }, opacity: 0.8 }}
                >
                  <ProductTypeChips list={item.product_type} />
                </Stack>
                {category !== "popular" && (
                  <Typography variant="caption" color="text.secondary">
                    Added on:{" "}
                    {item.insertTime.slice(0, item.insertTime.lastIndexOf("T"))}
                  </Typography>
                )}
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BreweryList;
