import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
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
  Stack,
  useTheme,
} from "@mui/material";
import ProductTableSearchBar from "../../ProductTable/ProductTableSearchBar";
import ProductSearchNotFound from "../../ProductTable/ProductSearchNotFound";
import { getData } from "../../../utils/fetchData";
import getCloudinaryUrl from "../../../lib/cloudinary/getCloudinaryUrl";
import CustomChips from "../../CustomChips";
import debounce from "../../../utils/searchbar/debounce";
import StarIcon from "@mui/icons-material/Star";

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

const SEARCH_PAGE_LIMIT = 50;

const SearchTable = ({ category }) => {
  const router = useRouter();
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));

  const [page, setPage] = useState(0);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [searchData, setSearchData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (router.query?.search) {
      //fill in searchbar on the search page with user search query
      setSearchQuery(router.query.search);
      return getSearchData(router.query.search, SEARCH_PAGE_LIMIT);
    }
    //if user does not clear search bar while switching between kombucha or brewery tabs,
    //fetch search data from the other category tab with the same query string
    if (searchQuery) {
      return getSearchData(searchQuery, SEARCH_PAGE_LIMIT);
    }
  }, [category]);

  const getSearchData = async (str, limit) => {
    try {
      let data = await getData(`${category}/search`, `${str}?limit=${limit}`);
      setSearchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const debounceSearch = useMemo(() => debounce(getSearchData, 300), []);

  //search page search bar
  const handleSearchBar = async (e) => {
    setSearchQuery(e.target.value);

    if (e.target.value) {
      return debounceSearch(e.target.value, SEARCH_PAGE_LIMIT);
    }
    //clear search data if event.target.value === "" (i.e. empty searchbar from backspace)
    setSearchData([]);
  };

  //clear search button query
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

  //create links to the search result item page with category name (kombucha or breweries tab)
  const createLinkBySearchType = (resultItem) => {
    //create link for kombucha search results
    if (category === "kombucha") return `/${category}/${resultItem._id}`;

    //create link for breweries search results
    return `/${category}/${resultItem.slug}`;
  };

  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Box display="flex" p={2} bgcolor="#F7F9FC">
          <ProductTableSearchBar
            searchQuery={searchQuery}
            handleSearchBar={handleSearchBar}
            clearSearchBar={clearSearchBar}
          />
        </Box>
        <Divider />
        <Table aria-label="simple table">
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
                            <Box mb={{ xs: 0.5, sm: 0.25 }}>
                              <Link
                                href={createLinkBySearchType(item)}
                                passHref
                              >
                                <Typography
                                  variant={isSM ? "body1" : "body2"}
                                  color="text.primary"
                                  component="a"
                                  fontWeight="700"
                                >
                                  {item.name}{" "}
                                </Typography>
                              </Link>
                              <Box sx={{ display: "inline-flex" }}>
                                {category === "kombucha" && (
                                  <Typography
                                    color="text.primary"
                                    variant={isSM ? "body1" : "body2"}
                                    fontWeight="600"
                                  >
                                    {"-"}
                                    <StarIcon
                                      color="primary"
                                      fontSize="small"
                                      sx={{ verticalAlign: "sub" }}
                                    />
                                    {item.avg === 0 ? "N/A" : item.avg}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          }
                          secondary={
                            <Stack
                              direction="row"
                              alignItems="flex-start"
                              flexWrap="wrap"
                            >
                              <Box pr={1}>
                                {category === "kombucha" ? (
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
                                ) : (
                                  <Typography variant="body2">
                                    {item.type}
                                  </Typography>
                                )}
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
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={searchData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="# of rows"
          sx={{
            "& .MuiTablePagination-toolbar": {
              pl: 0,
            },
          }}
        />
      </TableContainer>
    </>
  );
};

export default SearchTable;
