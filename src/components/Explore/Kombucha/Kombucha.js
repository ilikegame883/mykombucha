import { Box, Typography } from "@mui/material";
import ExplorePagination from "../ExplorePagination";
import ExploreTabs from "../ExploreTabs";
import List from "../Kombucha/List";

const PAGE_SIZE = 8; //# of items shown for each tab page
const TABS = ["recent", "top-rated", "new", "popular"];

const Kombucha = ({ exploreData, category, page }) => {
  const { sorted_list, total } = exploreData;

  //total = total number of fetched sorted items
  const totalPages = Math.ceil(total.count / PAGE_SIZE);

  return (
    <Box>
      <Box display="flex" flexWrap="wrap" mb={2}>
        <Box>
          <Typography color="secondary" fontWeight="600" variant="subtitle1">
            Explore
          </Typography>
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{ textTransform: "capitalize" }}
          >
            {category} {category === "recent" ? "Reviews" : "Kombucha"}
          </Typography>
        </Box>
      </Box>
      <ExploreTabs category={category} tabs={TABS} explore="Kombucha">
        <List sorted_list={sorted_list} category={category} />
      </ExploreTabs>
      <Box mt={3} display="flex" justifyContent="center">
        <ExplorePagination
          totalPages={totalPages}
          currentPage={page}
          category={category}
          path="kombucha"
        />
      </Box>
    </Box>
  );
};
export default Kombucha;
