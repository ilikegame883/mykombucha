import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { mutate } from "swr";
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
import { patchData } from "../../../../utils/fetch-utils";
import getCloudinaryUrl from "../../../../lib/cloudinary/getCloudinaryUrl";
import DeleteUserItem from "../../DeleteUserItem";
import { useSetSnackbar } from "../../../../utils/hooks/useSnackbar";

interface WishList {
  add_date?: string;
  kombucha_id?: any; //TODO: set types
}

interface WishListItemsProps {
  wish_list: WishList[];
  userId: string;
}

const WishListItems = ({ wish_list, userId }: WishListItemsProps) => {
  const { data: session } = useSession();
  const setSnackbar = useSetSnackbar();

  const wishListByDate = wish_list.sort((a: WishList, b: WishList) => {
    const aDate = new Date(a.add_date);
    const bDate = new Date(b.add_date);
    return aDate < bDate ? 1 : aDate > bDate ? -1 : 0;
  });

  const handleDelete = async (_id: string) => {
    if (!session) {
      return;
    }
    const res = await patchData(
      `users/${session.user.id}/wish-list?action=remove`,
      {
        kombucha_id: _id,
      }
    );

    if (res?.msg) {
      setSnackbar(res.msg, "success");
      mutate(`/api/users/${session.user.id}/wish-list`);
    }
    if (res?.err) setSnackbar(res.err, "error");
  };

  return (
    <Grid container>
      {wishListByDate.map(({ add_date, kombucha_id: kombucha }: WishList) => {
        return (
          <Grid item xs={12} key={kombucha._id}>
            <Box p={1.5}>
              <ListItem disableGutters sx={{ p: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    alt={kombucha.name}
                    src={getCloudinaryUrl(kombucha.image)}
                    sx={{ width: 50, height: 50 }}
                  />
                </ListItemAvatar>
                <Stack flexGrow={1}>
                  <Link href={`/kombucha/${kombucha._id}`} passHref>
                    <Typography
                      component="a"
                      variant="body2"
                      color="text.primary"
                      fontWeight="600"
                      sx={{
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {kombucha.name}
                    </Typography>
                  </Link>
                  <Link href={`/breweries/${kombucha.brewery_slug}`} passHref>
                    <Typography
                      variant="caption"
                      color="text.primary"
                      component="a"
                      sx={{
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {kombucha.brewery_name} Brewery
                    </Typography>
                  </Link>
                  <Typography variant="caption" color="text.secondary">
                    Added - {add_date.slice(0, add_date.lastIndexOf("T"))}
                  </Typography>
                </Stack>
                <Box>
                  {session?.user.id === userId && (
                    //DeleteUserItem is delete notification dialog
                    <DeleteUserItem
                      handleDelete={() => handleDelete(kombucha._id)}
                      item={kombucha.name} //TODO: rename prop
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
