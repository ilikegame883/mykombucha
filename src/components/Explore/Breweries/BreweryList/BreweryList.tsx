import Link from "next/link";
import { Avatar, Grid, Box, Typography, Paper, useTheme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import getCloudinaryUrl from "../../../../lib/cloudinary/getCloudinaryUrl";
import CustomChips from "../../../CustomChips";
import { ExploreBreweriesProps } from "../../../../../pages/breweries/explore/[category]/[page]";

interface BreweryListProps extends ExploreBreweriesProps {
  filterListBy: string;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(filter, orderBy) {
  return filter === "A-Z"
    ? (a, b) => -descendingComparator(a, b, orderBy)
    : (a, b) => descendingComparator(a, b, orderBy);
}

const BreweryList = ({
  sorted_list,
  category,
  filterListBy,
}: BreweryListProps) => {
  const theme = useTheme();

  const filterList = () => {
    const cloneList = [...sorted_list];

    switch (filterListBy) {
      case "Recent":
        return sorted_list;
      case "A-Z":
        return cloneList.sort(getComparator(filterListBy, "name"));
      case "Z-A":
        return cloneList.sort(getComparator(filterListBy, "name"));
    }
  };
  return (
    <Box component={Paper} variant="outlined">
      <Grid container>
        {filterList().map((item, i) => (
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
              <Box display="flex" alignItems="center" flexGrow={1}>
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
                    <Typography variant="body2" color="text.primary" pr={1}>
                      {item.brewery_type}
                    </Typography>
                    <CustomChips type={item.kombucha_type} />
                  </Box>
                </Box>
              </Box>
              {category !== "popular" && (
                <Box position="absolute" right={20} top={18}>
                  <Typography variant="caption" color="text.secondary">
                    Added:{" "}
                    {item.createdAt.slice(0, item.createdAt.lastIndexOf("T"))}
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
