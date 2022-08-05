/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  Divider,
  Box,
  Typography,
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  Stack,
} from "@mui/material";
import DeleteUserItem from "../../DeleteUserItem";
import { patchData } from "../../../../../utils/fetchData";
import getCloudinaryUrl from "../../../../../utils/getCloudinaryUrl";

const WishListItems = ({ wishList }) => {
  const { data: session } = useSession();

  const handleDelete = async (_id) => {
    if (!session) {
      return;
    }
    await patchData(`users/${session.user.username}/wish-list`, {
      kombucha_id: _id,
    });
    router.replace(router.asPath);
  };

  const router = useRouter();
  const { name } = router.query;

  return (
    <Grid container>
      {/* 1. wishList is list of kombuchas user added to wish list.
        Use individual kombucha data to populate kombucha wish list sidebar in user profile page

        2. Each kombucha item will store users that add kombucha to 
        their wish list, as well as the date the kombucha was added to their list. */}
      {wishList.map((k, i) => {
        const [userWishList] = k.wish_list_users.filter(
          (list) => list.username === name
        );
        return (
          <Grid item xs={12} key={i}>
            <Box p={1.5}>
              <ListItem disableGutters sx={{ padding: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    alt={k.name}
                    src={getCloudinaryUrl(k.image)}
                    sx={{ width: 50, height: 50 }}
                  />
                </ListItemAvatar>
                <Stack flexGrow={1}>
                  <Link href={`/kombucha/${k._id}`} passHref>
                    <Typography
                      component="a"
                      variant="body2"
                      color="text.primary"
                      fontWeight="600"
                      sx={{
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {k.name}
                    </Typography>
                  </Link>
                  <Link href={`/breweries/${k.brewery_slug}`} passHref>
                    <Typography
                      variant="caption"
                      color="text.primary"
                      component="a"
                      sx={{
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {k.brewery_name} Brewery
                    </Typography>
                  </Link>
                  <Typography variant="caption" color="text.secondary">
                    Added - {userWishList.date}
                  </Typography>
                </Stack>
                <Box>
                  {session && session.user.username === name && (
                    <DeleteUserItem
                      handleDelete={() => handleDelete(k._id)}
                      item={k.name}
                    />
                  )}
                </Box>
              </ListItem>
            </Box>
            <Divider />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default WishListItems;
