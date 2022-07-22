import React from "react";
import Link from "next/link";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  Avatar,
  Rating,
  Stack,
} from "@mui/material";
import getCloudinaryUrl from "../../../utils/getCloudinaryUrl";

const TopKombuchaList = ({ kombuchaList }) => {
  return (
    <>
      <Box
        width={{ xs: 1, sm: 400 }}
        bgcolor="background.paper"
        sx={{
          borderRadius: 2,
          boxShadow:
            "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
        }}
      >
        <Box py={1.5}>
          <Typography variant="body1" align="center" fontWeight="700">
            Top Rated Kombuchas
          </Typography>
        </Box>
        <Divider />
        <List
          sx={{
            py: 0,
          }}
        >
          {kombuchaList.map((k) => (
            <React.Fragment key={k.name}>
              <ListItem alignItems="center" sx={{ p: 2 }}>
                <ListItemAvatar sx={{ mr: 1 }}>
                  <Avatar
                    variant="square"
                    alt={k.name}
                    src={getCloudinaryUrl(k.image)}
                    sx={{ height: 60, width: 60 }}
                  />
                </ListItemAvatar>

                <Stack>
                  <Box>
                    <Link href={`/kombucha/${k._id}`} passHref>
                      <Typography
                        component="a"
                        variant="body1"
                        color="text.primary"
                        fontWeight="700"
                        sx={{
                          textDecoration: "none",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {k.name}
                      </Typography>
                    </Link>
                  </Box>
                  <Box mb={0.25}>
                    <Link href={`/breweries/${k.brewery_slug}`} passHref>
                      <Typography
                        component="a"
                        variant="body2"
                        color="text.primary"
                      >
                        {k.brewery.name} Brewery
                      </Typography>
                    </Link>
                  </Box>
                  <Box>
                    <Rating
                      value={k.avg}
                      readOnly
                      size="small"
                      precision={0.25}
                      sx={{ verticalAlign: "sub", display: "" }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                      sx={{ verticalAlign: "top" }}
                    >
                      ({k.avg})
                    </Typography>
                  </Box>
                </Stack>
              </ListItem>

              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
        <Box width={1} py={1.5} sx={{ textAlign: "center" }}>
          <Link href="/kombucha/explore/recent/1" passHref>
            <Typography
              variant="body2"
              component="a"
              color="secondary"
              fontWeight="600"
            >
              See more
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
};
export default TopKombuchaList;
