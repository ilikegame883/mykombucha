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
import { getData } from "../../../utils/fetch-utils";
import getCloudinaryUrl from "../../../lib/cloudinary/getCloudinaryUrl";
import CustomChips from "../../CustomChips";
import debounce from "../../../utils/debounce";
import StarIcon from "@mui/icons-material/Star";
import { BreweryData, KombuchaData } from "../../../types/api";
import { SEARCH_PAGE_LIMIT } from "../../../utils/consts";

interface SearchTableProps {
  category: string;
  searchBar: string;
  setSearchBar: React.Dispatch<React.SetStateAction<string>>;
  setKombuchaTabCount: React.Dispatch<React.SetStateAction<number>>;
  setBreweryTabCount: React.Dispatch<React.SetStateAction<number>>;
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

const SearchTable = ({
  category,
  searchBar,
  setSearchBar,
  setKombuchaTabCount,
  setBreweryTabCount,
}: SearchTableProps) => {
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));

  const [page, setPage] = useState(0);
  const [searchData, setSearchData] = useState<KombuchaData[] | BreweryData[]>(
    []
  );
  const [order, setOrder] = useState({
    direction: "asc",
    by: "name",
    rows: 10, //default rows per page
  });

  useEffect(() => {
    setPage(0);
    //if user switches to a new tab and does not clear searchbar, search the same keyword in the new tab
    (async () => {
      if (searchBar) {
        return await getSearchData(searchBar, SEARCH_PAGE_LIMIT);
      }
    })();
  }, [category]);

  const getSearchData = async (str: string, limit: number) => {
    try {
      const kombuchaData = await getData(
        "kombucha/search",
        `${str}?limit=${limit}`
      );
      const breweryData = await getData(
        "breweries/search",
        `${str}?limit=${limit}`
      );
      setSearchData(category === "kombucha" ? kombuchaData : breweryData);
      setKombuchaTabCount(!kombuchaData.length ? 0 : kombuchaData.length);
      setBreweryTabCount(!breweryData.length ? 0 : breweryData.length);
    } catch (error) {
      console.error(error);
    }
  };

  const debounceSearch = useMemo(
    () => debounce(getSearchData, 300),
    [category]
  );

  //searchbar inside search page
  const handleSearchBar: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = async (e) => {
    setSearchBar(e.target.value);

    if (e.target.value) {
      return debounceSearch(e.target.value, SEARCH_PAGE_LIMIT);
    }
    //clear search data when event.target.value === "" (i.e. empty searchbar from backspace)
    setSearchData([]);
  };

  //clear search bar x button
  const clearSearchBar = () => {
    setSearchBar("");
    setSearchData([]);
    setKombuchaTabCount(0);
    setBreweryTabCount(0);
  };

  const handleChangeRowsPerPage: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setOrder((prev) => ({ ...prev, row: parseInt(e.target.value) }));
    setPage(0);
  };

  const handleChangePage = (e, newPage: number) => {
    setPage(newPage);
  };

  const createLinkByCategory = (listItem) => {
    //create link for kombucha search results
    if (category === "kombucha") return `/${category}/${listItem._id}`;

    //create link for breweries search results
    return `/${category}/${listItem.slug}`;
  };

  return (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Box display="flex" p={2} bgcolor="#F7F9FC">
          <ProductTableSearchBar
            searchBar={searchBar}
            handleSearchBar={handleSearchBar}
            clearSearchBar={clearSearchBar}
          />
        </Box>
        <Divider />
        <Table aria-label="simple table">
          <TableBody>
            {searchData
              .slice(page * order.rows, page * order.rows + order.rows)
              .sort(getComparator(order.direction, order.by))
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
                              <Link href={createLinkByCategory(item)} passHref>
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
                                      sx={{ verticalAlign: "sub", mr: 0.25 }}
                                    />
                                    {item.rating_avg === 0
                                      ? "No Ratings"
                                      : item.rating_avg}
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
                                    {item.brewery_type}
                                  </Typography>
                                )}
                              </Box>
                              <CustomChips type={item.kombucha_type} />
                            </Stack>
                          }
                        />
                      </ListItem>
                    </List>
                  </TableCell>
                </TableRow>
              ))}

            {!searchData.length && (
              <TableRow>
                <TableCell align="center" sx={{ py: 3 }}>
                  <ProductSearchNotFound category={category} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={searchData.length}
          rowsPerPage={order.rows}
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
