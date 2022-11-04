import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { mutate } from "swr";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  Divider,
} from "@mui/material";
import ReviewTableHead from "./ReviewTableHead";
import ReviewSearchBar from "./ReviewSearchBar";
import ReviewNotFound from "./ReviewNotFound";
import { deleteData } from "../../../../utils/fetchData";
import { AlertContext } from "../../../../stores/context/alert.context";
import { toggleSnackBar } from "../../../../stores/alert.actions";
import ReviewRow from "./ReviewRow/ReviewRow";

const TABLE_HEAD = [
  {
    id: "name",
    label: "Name",
    alignRight: false,
  },
  {
    id: "product_type",
    label: "Type",
    alignRight: true,
  },
  {
    id: "rating",
    label: "My Rating",
    alignRight: true,
  },
  {
    id: "avg",
    label: "Avg",
    alignRight: true,
  },
  {
    id: "date",
    label: "Date",
    alignRight: true,
  },
  {
    id: "delete",
    label: "",
    alignRight: false,
  },
];

function createReviewData(
  name,
  brewery,
  product_type,
  rating,
  avg,
  date,
  product_id,
  user_id,
  review_id,
  image,
  brewery_slug,
  comment
) {
  return {
    name,
    brewery,
    product_type,
    rating,
    avg,
    date,
    product_id,
    user_id,
    review_id,
    image,
    brewery_slug,
    comment,
  };
}

const descendingComparator = (a, b, orderBy) => {
  //a & b is an {} from row array
  if (b[orderBy] < a[orderBy]) {
    //ex: b[orderBy = "name"] = "cupcake"
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (orderDirection, orderBy) => {
  return orderDirection === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};
const applySearchFilter = (array, query) => {
  if (query) {
    return array.filter(
      (_kombucha) =>
        _kombucha.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return array;
};

const UserReviewTable = ({ userReviews }) => {
  //userReviews = []
  const { dispatch } = useContext(AlertContext);

  const [page, setPage] = useState(0);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [searchUserReview, setSearchUserReview] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: session } = useSession();

  const reviewRows = userReviews.map(
    ({
      kombucha_info,
      brewery,
      rating,
      createdAt,
      user,
      _id,
      brewery_slug,
      comment,
    }) => {
      const dateOnly = createdAt.slice(0, createdAt.lastIndexOf("T"));
      return createReviewData(
        kombucha_info.name,
        brewery,
        kombucha_info.product_type,
        rating,
        kombucha_info.avg.toFixed(2),
        dateOnly,
        kombucha_info._id,
        user,
        _id,
        kombucha_info.image,
        brewery_slug,
        comment
      );
    }
  );
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    //set orderBy value to the table head name when clicked
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleSearchUserReview = (event) => {
    setSearchUserReview(event.target.value);
  };

  const clearSearchBar = () => {
    setSearchUserReview("");
  };

  const handleDelete = async (reviewData) => {
    const res = await deleteData("reviews", reviewData);
    if (res?.msg) {
      //swr will not revalidate unless mutate is called
      dispatch(toggleSnackBar("success", res.msg, true));
      mutate(`/api/users/${session.user.username}/reviews`);
    }
    if (res?.err) {
      dispatch(toggleSnackBar("error", res.err, true));
    }
  };

  const filteredReview = applySearchFilter(reviewRows, searchUserReview);
  const isReviewNotFound = filteredReview.length === 0;

  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography variant="h6" fontWeight="600" color="text.primary">
            Reviews
          </Typography>

          <ReviewSearchBar
            searchUserReview={searchUserReview}
            handleSearchUserReview={handleSearchUserReview}
            clearSearchBar={clearSearchBar}
          />
        </Box>
        <Divider />
        <Table>
          <ReviewTableHead
            orderDirection={orderDirection}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={reviewRows.length}
            handleRequestSort={handleRequestSort}
          />
          <TableBody>
            {/* render only the rows required per page using Array.slice
             and sort the active row(orderBy) by decending order*/}
            {filteredReview
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator(orderDirection, orderBy))
              .map((row) => {
                return (
                  <ReviewRow
                    key={row.name}
                    row={row}
                    handleDelete={handleDelete}
                    session={session}
                  />
                );
              })}
            {isReviewNotFound && (
              <TableRow>
                <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
                  <ReviewNotFound
                    searchUserReview={searchUserReview}
                    userReviews={userReviews}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={reviewRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default UserReviewTable;
