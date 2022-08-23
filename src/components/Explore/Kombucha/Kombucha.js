import { Box } from "@mui/material";
import ExplorePagination from "../ExplorePagination";
import ExploreTabs from "../ExploreTabs";
import List from "../Kombucha/List";

const PAGE_SIZE = 8; //# of items shown for each tab page

const Kombucha = ({ exploreData, category, page }) => {
  const { sorted_list, total } = exploreData;

  //total = total number of fetched sorted items
  const totalPages = Math.ceil(total.count / PAGE_SIZE);

  return (
    <Box>
      <ExploreTabs category={category}>
        <List sorted_list={sorted_list} category={category} />
      </ExploreTabs>
      <ExplorePagination
        totalPages={totalPages}
        currentPage={page}
        category={category}
      />
    </Box>
  );
};
export default Kombucha;
