import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Box,
} from "@mui/material";

const ReviewTableHead = ({
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
        <TableCell size="small" sx={{ px: 0 }} />
        {headLabel.map((headCell, idx) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? orderDirection : false}
            sx={{ px: idx === headLabel.length - 1 ? 0 : 2 }}
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

ReviewTableHead.propTypes = {
  orderDirection: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default ReviewTableHead;
