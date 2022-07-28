import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Box,
  Divider,
  TablePagination,
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
  useTheme,
} from "@mui/material";
import ProductTableSearchBar from "../../ProductTable/ProductTableSearchBar";
import ProductSearchNotFound from "../../ProductTable/ProductSearchNotFound";
import ProductTableHead from "../../ProductTable/ProductTableHead";
import CustomChips from "../../CustomChips";

const TABLE_HEAD = [
  {
    id: "name",
    label: "Name",
    align: "left",
  },
  {
    id: "product_type",
    label: "Type",
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
  product_type,
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
    product_type,
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

const BreweryProductTable = ({ singleBreweryData }) => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));

  const [page, setPage] = useState(0);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: session } = useSession();

  const { kombuchas, reviews } = singleBreweryData;

  //If user in session has rated a kombucha from brewery
  //Show user rating on brewery kombucha list table
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
    ({ name, product_type, review_count, updatedAt, _id, avg, image }) => {
      const dateOnly = updatedAt.slice(0, updatedAt.lastIndexOf("T"));

      const userSessionRating = getUserSessionRating(_id);
      return createTableData(
        name,
        product_type,
        userSessionRating,
        avg.toFixed(2),
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

  const filteredKombucha = applySearchFilter(rows, searchQuery);
  const isKombuchaNotFound = filteredKombucha.length === 0;

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
                    <CustomChips type={item.product_type} />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2" fontWeight="600">
                      {item.userSessionRating}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.avg}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle2">
                      {item.total_ratings}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="caption">{item.added}</Typography>
                  </TableCell>
                </TableRow>
              ))}

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
