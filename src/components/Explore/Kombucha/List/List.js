import { Grid, Box, Paper } from "@mui/material";
import RecentListCard from "./RecentListCard";
import ListCard from "./ListCard";

const List = ({ sorted_list, category }) => {
  return (
    <Box component={Paper} variant="outlined">
      <Grid container>
        {category === "recent" ? (
          <RecentListCard sorted_list={sorted_list} category={category} />
        ) : (
          <ListCard sorted_list={sorted_list} category={category} />
        )}
      </Grid>
    </Box>
  );
};

export default List;
