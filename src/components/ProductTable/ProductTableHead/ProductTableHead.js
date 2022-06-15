import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
} from "@mui/material";

const ProductTableHead = ({
  orderDirection,
  orderBy,
  headLabel,
  handleRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHead bgcolor="#F7F9FC">
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? orderDirection : false}
            // padding={headCell.id === "name" ? "none" : null}
            // {...(headCell.id === "name" && { padding: "none" })}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? orderDirection : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ fontWeight: 700 }}
            >
              {headCell.label}

              {orderBy === headCell.id ? (
                //hidden visually, but available for screen readers
                <Box sx={{ ...visuallyHidden }}>
                  {orderDirection === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

ProductTableHead.propTypes = {
  orderDirection: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default ProductTableHead;
