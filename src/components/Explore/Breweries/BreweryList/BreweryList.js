import Link from "next/link";
import {
  Avatar,
  Rating,
  Stack,
  Grid,
  Box,
  Typography,
  Chip,
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
              borderBottom: `1px solid ${theme.palette.divider}`,
              "&:last-child": {
                borderBottom: 0,
              },
            }}
          >
            <Box
              padding={3}
              display={"flex"}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Box
                display={"flex"}
                alignItems="center"
                pb={{ xs: 1, sm: 0 }}
                flexGrow={1}
              >
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
              <Stack
                alignItems={{ xs: "flex-start", sm: "flex-end" }}
                justifyContent="center"
                spacing={1}
              >
                {category === "popular" ? (
                  <Typography variant="body1">
                    {item.favorite_count}{" "}
                    <FavoriteIcon
                      color="error"
                      fontSize="small"
                      sx={{ verticalAlign: "text-top" }}
                    />
                  </Typography>
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    Date added:{" "}
                    {item.insertTime.slice(0, item.insertTime.lastIndexOf("T"))}
                  </Typography>
                )}
                <Stack direction="row" spacing={1} sx={{ opacity: 0.8 }}>
                  <ProductTypeChips list={item.product_type} />
                </Stack>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BreweryList;
