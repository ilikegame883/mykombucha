import React from "react";
import { Divider, Box, Typography } from "@mui/material";
import WishListItems from "./WishListItems";
import WishListDialog from "./WishListDialog";
import useSWR from "swr";
import CircularProgress from "@mui/material/CircularProgress";

interface UserWishListProps {
  userId: string; //TODO: set types
}
const UserWishList = ({ userId }: UserWishListProps) => {
  //returns [] empty array if wish_list field is not found in db
  const { data: wish_list } = useSWR(`/api/users/${userId}/wish-list`);

  //show loading status while wish_list data is fetching/loading
  if (!wish_list) return <CircularProgress />;

  const isWishListEmpty = !wish_list.length; //[] = true
  return (
    <Box>
      <Box p={1} bgcolor="#F7F9FC">
        <Typography
          variant="h6"
          align="center"
          color="text.primary"
          fontWeight="500"
        >
          {`Wish List (${isWishListEmpty ? "0" : wish_list.length})`}
        </Typography>
      </Box>
      <Divider />
      {isWishListEmpty ? (
        <Box height={100} textAlign="center">
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight="500"
            pt={4}
          >
            No items in your wish list
          </Typography>
        </Box>
      ) : (
        <>
          <WishListItems wish_list={wish_list} userId={userId} />
          <WishListDialog wish_list={wish_list} userId={userId} />
        </>
      )}
    </Box>
  );
};

export default UserWishList;
