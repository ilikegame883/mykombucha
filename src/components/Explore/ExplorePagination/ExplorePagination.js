import { Pagination } from "@mui/material";
import { useRouter } from "next/router";

const ExplorePagination = ({ totalPages, currentPage, category }) => {
  const router = useRouter();

  const handleChangePage = (event, page) => {
    //parameter page = selected page value passed in from <Pagination /> Component
    router.push(`/kombucha/explore/${category}/${page}`);
  };

  return (
    <Pagination
      color="primary"
      count={totalPages}
      page={parseInt(currentPage)} //highlight current selected page button
      shape="rounded"
      onChange={handleChangePage}
    />
  );
};

export default ExplorePagination;
