import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Avatar,
  Collapse,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteUserItem from "../../DeleteUserItem";

const ReviewRow = ({ row, handleDelete, session }) => {
  const [openReview, setOpenReview] = useState(false);

  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <TableRow>
        <TableCell size="small" sx={{ px: 0, width: 20 }}>
          <IconButton onClick={() => setOpenReview(!openReview)}>
            {openReview ? (
              <KeyboardArrowUpIcon sx={{ color: "text.secondary" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: "text.secondary" }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell sx={{ pl: 0 }}>
          <Stack direction="row" alignItems="center">
            <Avatar
              variant="square"
              src={row.image}
              sx={{ height: 50, width: 50 }}
            />
            <Box>
              <Link href={`/kombucha/${row.product_id}`} passHref>
                <Typography
                  component="a"
                  variant="body1"
                  color="text.primary"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {row.name}
                </Typography>
              </Link>
              <Box>
                <Link href={`/breweries/${row.brewery_slug}`} passHref>
                  <Typography
                    component="a"
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    noWrap
                  >
                    {row.brewery} Brewing Co.
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Stack>
        </TableCell>
        <TableCell align="right" sx={{ p: 2 }}>
          {row.type}
        </TableCell>
        <TableCell align="right" sx={{ fontWeight: 700 }}>
          {row.rating}
        </TableCell>
        <TableCell align="right" sx={{ p: 2 }}>
          {row.avg}
        </TableCell>
        <TableCell align="right" sx={{ p: 2 }}>
          {row.date}
        </TableCell>
        {session && session.user.username === name ? (
          <TableCell align="left" sx={{ p: 0 }}>
            <DeleteUserItem
              handleDelete={() => handleDelete(row)}
              item="review"
            />
          </TableCell>
        ) : (
          <TableCell align="left" sx={{ p: 0 }} />
        )}
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={7}
          sx={{ py: 0, borderBottom: !openReview && "none" }}
        >
          <Collapse in={openReview} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="body1" fontWeight="500" color="text.primary">
                Review:
              </Typography>
              <Typography variant="body2" color="text.primary">
                {row.comment}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ReviewRow;