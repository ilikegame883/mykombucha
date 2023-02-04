import React, { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
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
import ReviewRow from "./ReviewRow";
import ReviewSearchBar from "./ReviewSearchBar";
import ReviewNotFound from "./ReviewNotFound";
import ReviewTableHead from "./ReviewTableHead";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserReviewRowData } from "../../../utils/getTableRowData";
import { UserData } from "../../../types/api";

const TABLE_HEAD = [
  {
    id: "name", //kombucha name
    label: "Name",
    alignRight: false,
  },
  {
    id: "kombucha_type",
    label: "Type",
    alignRight: true,
  },
  {
    id: "user_rating",
    label: "My Rating",
    alignRight: true,
  },
  {
    id: "rating_avg",
    label: "Avg",
    alignRight: true,
  },
  {
    id: "formatDate",
    label: "Date",
    alignRight: true,
  },
  {
    id: "delete",
    label: "",
    alignRight: false,
  },
];

const descendingComparator = (a, b, orderBy: string) => {
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

const getComparator = (orderDirection: string, orderBy: string) => {
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

interface UserReviewTableProps {
  userData: UserData;
}

//TODO: update types
const UserReviewTable = ({ userData }: UserReviewTableProps) => {
  const { _id: userId } = userData;

  const { data: userReviews, error } = useSWR(`/api/users/${userId}/reviews`);
  const { data: session } = useSession();

  const [page, setPage] = useState(0);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [searchUserReview, setSearchUserReview] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (!userReviews || error) return <CircularProgress />;

  const reviewRows = getUserReviewRowData(userReviews);

  const handleRequestSort = (
    e: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    setOrderDirection(isAsc ? "desc" : "asc");
    //set orderBy value to the table head name when clicked
    setOrderBy(property);
  };

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value));
    setPage(0);
  };

  const handleSearchUserReview = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchUserReview(e.target.value);
  };

  const clearSearchBar = () => {
    setSearchUserReview("");
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
            handleRequestSort={handleRequestSort}
          />
          <TableBody>
            {/* render only the rows required per page using Array.slice
             and sort the active row(orderBy) by decending order*/}
            {filteredReview
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator(orderDirection, orderBy))
              .map((row) => {
                return <ReviewRow key={row.name} row={row} session={session} />;
              })}
            {isReviewNotFound && (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={7}
                  sx={{ py: 3, border: "none" }}
                >
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
