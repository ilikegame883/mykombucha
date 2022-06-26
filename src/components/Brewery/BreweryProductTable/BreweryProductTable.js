import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Divider,
  TablePagination,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  useMediaQuery,
  Chip,
} from "@mui/material";
import ProductTableSearchBar from "../../ProductTable/ProductTableSearchBar";
import ProductSearchNotFound from "../../ProductTable/ProductSearchNotFound";
import ProductTableHead from "../../ProductTable/ProductTableHead";

const TABLE_HEAD = [
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "category",
    label: "Category",
    align: "right",
  },
  {
    id: "userSessionRating",
    label: "My Rating",
    align: "right",
  },
  {
    id: "avg",
    label: "Avg",
    align: "right",
  },
  {
    id: "total_ratings",
    label: "Total Ratings",
    align: "right",
  },
  {
    id: "added",
    label: "Added",
    align: "right",
  },
];

function createTableData(
  name,
  category,
  userSessionRating,
  avg,
  total_ratings,
  added,
  _id,
  image
) {
  //_id = kombucha product id
  return {
    name,
    category,
    userSessionRating,
    avg,
    total_ratings,
    added,
    _id,
    image,
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

const BreweryProductTable = ({ breweryData, session }) => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));

  const { kombuchas, reviews } = breweryData;

  const [page, setPage] = useState(0);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  //For Brewery Product Table
  const getUserSessionRating = (_id) => {
    if (session) {
      const findUserSessionReview = reviews.find(
        (review) => _id === review.product && review.user === session.user._id
      );
      const getRating = findUserSessionReview
        ? findUserSessionReview.rating
        : "-";
      return getRating;
    }
    return "-";
  };

  const rows = kombuchas.map(
    ({ name, category, review_count, updatedAt, _id, avg, image }) => {
      const dateOnly = updatedAt.slice(0, updatedAt.lastIndexOf("T"));
      const userSessionRating = getUserSessionRating(_id);
      return createTableData(
        name,
        category,
        userSessionRating,
        avg,
        review_count,
        dateOnly,
        _id,
        image
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

  const handleSearchBar = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearchBar = () => {
    setSearchQuery("");
  };

  //get # of emptyRows if row items are less than the set amount of rows per page (5)
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const filteredKombucha = applySearchFilter(rows, searchQuery);
  const isKombuchaNotFound = filteredKombucha.length === 0;

  if (!breweryData) return <CircularProgress color="primary" />;

  return (
    <>
      <TableContainer component={Paper}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Typography variant="h6" fontWeight="600" color="text.primary" mr={2}>
            Kombuchas
          </Typography>
          <ProductTableSearchBar
            searchQuery={searchQuery}
            handleSearchBar={handleSearchBar}
            clearSearchBar={clearSearchBar}
          />
        </Box>
        <Divider />
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <ProductTableHead
            orderDirection={orderDirection}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            handleRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {filteredKombucha
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator(orderDirection, orderBy))
              .map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <List sx={{ p: 0, m: 0 }}>
                      <ListItem sx={{ p: 0, m: 0 }}>
                        <ListItemAvatar>
                          <Avatar variant="square" src={item.image} />
                        </ListItemAvatar>
                        <ListItemText
                          disableTypography
                          primary={
                            <Box>
                              <Link href={`/kombucha/${item._id}`} passHref>
                                <Typography
                                  variant={isSM ? "body1" : "body2"}
                                  color="text.primary"
                                  component="a"
                                  fontWeight="500"
                                  sx={{
                                    textDecoration: "none",
                                    "&:hover": {
                                      textDecoration: "underline",
                                    },
                                  }}
                                >
                                  {item.name}
                                </Typography>
                              </Link>
                            </Box>
                          }
                        />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={item.category}
                      size="small"
                      color={item.category === "Kombucha" ? "primary" : "error"}
                    />
                    {/* <Typography variant={"subtitle2"}>
                      {item.category}
                    </Typography> */}
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant={"subtitle2"} color="text.secondary">
                      {item.userSessionRating}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant={"subtitle2"}>{item.avg}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant={"subtitle2"}>
                      {item.total_ratings}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant={"subtitle2"}>{item.added}</Typography>
                  </TableCell>
                </TableRow>
              ))}

            {/* {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 90 * emptyRows,
                }}
              >
                <TableCell align="center" colSpan={6} />
              </TableRow>
            )} */}
            {isKombuchaNotFound && (
              <TableRow>
                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                  <ProductSearchNotFound searchQuery={searchQuery} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default BreweryProductTable;
