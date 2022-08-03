import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { alpha } from "@mui/material/styles";
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
  Stack,
  useTheme,
} from "@mui/material";
import ProductTableSearchBar from "../../ProductTable/ProductTableSearchBar";
import ProductSearchNotFound from "../../ProductTable/ProductSearchNotFound";
import { getData } from "../../../utils/fetchData";
import getCloudinaryUrl from "../../../utils/getCloudinaryUrl";
import CustomChips from "../../CustomChips";

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

const SearchTable = ({ category }) => {
  const router = useRouter();
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));

  const [page, setPage] = useState(0);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (router.query?.q) {
      setSearchQuery(router.query.q);
      return getSearchData(router.query.q);
    }
    //if user input text inside search bar still remains when switching between kombucha or brewery tabs,
    //fetch data with the same text from the api endpoint associated with the switched over tab
    if (searchQuery) {
      return getSearchData(searchQuery);
    }
  }, [category]);

  const getSearchData = async (str) => {
    try {
      let data = await getData(category, `search/${str}`);
      setSearchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchBar = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value) {
      //   let data = await getSearchData(e.target.value);
      //   return setSearchData(data);
      return await getSearchData(e.target.value);
    }
    //if event.target.value === "" (empty searchbar from backspace)
    //clear data
    setSearchData([]);
  };

  //clear search button
  const clearSearchBar = () => {
    setSearchQuery("");
    setSearchData([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const noMatchesFound = searchData.length === 0;

  //create link to the item page for each search result based on category name (kombucha or breweries)
  const createLinkBySearchType = (resultItem) => {
    //create link for kombucha search results
    if (category === "kombucha") return `/${category}/${resultItem._id}`;

    //create link for breweries search results
    return `/${category}/${resultItem.slug}`;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Box display="flex" p={2}>
          <ProductTableSearchBar
            searchQuery={searchQuery}
            handleSearchBar={handleSearchBar}
            clearSearchBar={clearSearchBar}
          />
        </Box>
        <Divider />
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableBody>
            {searchData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort(getComparator(orderDirection, orderBy))
              .map((item, i) => (
                <TableRow key={i}>
                  <TableCell scope="row">
                    <List sx={{ p: 0, m: 0 }}>
                      <ListItem sx={{ p: 0, m: 0 }}>
                        <ListItemAvatar>
                          <Avatar
                            variant="square"
                            src={getCloudinaryUrl(item.image)}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          disableTypography
                          primary={
                            <Box>
                              <Link
                                href={createLinkBySearchType(item)}
                                passHref
                              >
                                <Typography
                                  variant={isSM ? "body1" : "body2"}
                                  color="text.primary"
                                  component="a"
                                  fontWeight="700"
                                  sx={{
                                    textDecoration: "none",
                                  }}
                                >
                                  {item.name}
                                </Typography>
                              </Link>
                            </Box>
                          }
                          secondary={
                            <Stack
                              direction="row"
                              alignItems="center"
                              flexWrap="wrap"
                            >
                              <Box pr={0.5}>
                                <Link
                                  href={`/breweries/${
                                    item.brewery_slug || item.slug
                                  }`}
                                  passHref
                                >
                                  <Typography
                                    variant="body2"
                                    component="a"
                                    sx={{
                                      "&:hover": {
                                        textDecoration: "underline",
                                      },
                                    }}
                                  >
                                    {item.brewery_name} Brewery
                                  </Typography>
                                </Link>
                              </Box>
                              <CustomChips type={item.product_type} />
                            </Stack>
                          }
                        />
                      </ListItem>
                    </List>
                  </TableCell>
                </TableRow>
              ))}

            {noMatchesFound && (
              <TableRow>
                <TableCell align="center" sx={{ py: 3 }}>
                  <ProductSearchNotFound searchQuery={searchQuery} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={searchData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default SearchTable;
