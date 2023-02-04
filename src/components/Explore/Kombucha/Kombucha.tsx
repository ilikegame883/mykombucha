import { Box, Typography, Grid, Paper } from "@mui/material";
import { ExploreKombuchaPageProps } from "../../../../pages/kombucha/explore/[category]/[page]";
import { KombuchaData, ReviewData } from "../../../types/api";
import ExplorePagination from "../ExplorePagination";
import ExploreTabs from "../ExploreTabs";
import ListCard from "./ListCard";
import RecentListCard from "./RecentListCard";

const PAGE_SIZE = 8; //# of items shown for each tab page
const TABS = ["recent", "top-rated", "new", "popular"];

interface KombuchaProps extends ExploreKombuchaPageProps {}

const Kombucha = ({ exploreData, category, page }: KombuchaProps) => {
  const { sorted_list, total_kombucha } = exploreData;

  const totalPages = Math.ceil(total_kombucha.count / PAGE_SIZE);

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
        <Box component={Paper} variant="outlined">
          <Grid container>
            {category === "recent" ? (
              <RecentListCard sorted_list={sorted_list as ReviewData[]} />
            ) : (
              <ListCard
                sorted_list={sorted_list as KombuchaData[]}
                category={category}
              />
            )}
          </Grid>
        </Box>
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
