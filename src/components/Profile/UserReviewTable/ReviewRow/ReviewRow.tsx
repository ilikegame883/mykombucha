import React, { useState } from "react";
import Link from "next/link";
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
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteUserItem from "../../DeleteUserItem";
import CustomChips from "../../../CustomChips";
import getCloudinaryUrl from "../../../../lib/cloudinary/getCloudinaryUrl";
import { deleteData } from "../../../../utils/fetch-utils";
import { mutate } from "swr";
import { useSetSnackbar } from "../../../../utils/hooks/useSnackbar";

const ReviewRow = ({ row, session }) => {
  const [openReview, setOpenReview] = useState(false);
  const setSnackbar = useSetSnackbar();
  const handleOpenAccordian = (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent> & {
      target: HTMLAnchorElement;
    }
  ) => {
    if (e.target.href) return; //prevent link from opening if user clicks on href element
    setOpenReview(!openReview);
  };

  const handleDelete = async (reviewData) => {
    //TODO: delete data from user.review and review collection
    //reviewData - add to body - user's review rating
    const res = await deleteData(
      `kombucha/${row.kombucha_id}/reviews/${row.review_id}`,
      reviewData
    );
    if (res?.msg) {
      mutate(`/api/users/${row.review_author.data}/reviews`); //fetch/mutate updated user_reviews
      mutate(`/api/users/${session.user.id}`); //fetch/mutate updated kombucha_reviews
      setSnackbar(res.msg, "success");
    }
    if (res?.err) setSnackbar(res.err, "error");
  };

  return (
    <>
      <TableRow onClick={handleOpenAccordian}>
        <TableCell size="small" sx={{ pr: 0, pl: 0.5, width: 20 }}>
          <IconButton>
            {openReview ? (
              <ArrowDropDownIcon sx={{ color: "text.secondary" }} />
            ) : (
              <ArrowRightIcon sx={{ color: "text.secondary" }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell sx={{ pl: 0 }}>
          <Stack direction="row" alignItems="center">
            <Avatar
              variant="square"
              src={getCloudinaryUrl(row.image)}
              sx={{ height: 50, width: 50 }}
            />
            <Box ml={1}>
              <Link href={`/kombucha/${row.kombucha_id}`} passHref>
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
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                    noWrap
                  >
                    {row.brewery} Brewery
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Stack>
        </TableCell>
        <TableCell align="right">
          <CustomChips type={row.kombucha_type} />
        </TableCell>
        <TableCell align="right" sx={{ fontWeight: 600 }}>
          {row.user_rating}
        </TableCell>
        <TableCell align="right">{row.rating_avg}</TableCell>
        <TableCell align="right">
          <Typography variant="caption">{row.review_date}</Typography>
        </TableCell>
        {session && session.user.id === row.review_author.data ? (
          <TableCell align="left">
            <DeleteUserItem
              handleDelete={() => handleDelete(row)}
              item="review"
            />
          </TableCell>
        ) : (
          <TableCell align="left" />
        )}
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={7}
          sx={{ py: 0, borderBottom: !openReview && "none" }}
        >
          <Collapse in={openReview} timeout="auto" unmountOnExit>
            <Box sx={{ py: 1 }}>
              <Typography variant="body1" fontWeight="500" color="text.primary">
                Review:
              </Typography>
              <Typography variant="body2" color="text.primary">
                {row.review_comment}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ReviewRow;
