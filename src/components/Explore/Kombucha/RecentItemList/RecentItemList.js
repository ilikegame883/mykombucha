import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { Avatar, Stack, Grid, Box, Typography, Paper } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import RevealText from "../../../RevealText";

const RecentItemList = ({ reviewList }) => {
  const theme = useTheme();
  console.log(reviewList);
  // const [order, setOrder] = useState()

  return (
    <Box component={Paper}>
      <Grid container>
        {reviewList.map((item, i) => (
          <Grid
            item
            xs={12}
            key={i}
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              "&:last-child": {
                borderBottom: 0,
              },
            }}
          >
            <Box padding={3} display={"flex"} alignItems={"center"}>
              <Box
                display={"flex"}
                flexDirection={{ xs: "column", sm: "row" }}
                flex={"1 1 100%"}
                // justifyContent={{ sm: "space-between" }}
                alignItems={{ sm: "center" }}
              >
                <Box pr={2} width={60} height={60}>
                  <Avatar
                    variant="square"
                    src={item.kombucha.image}
                    alt={item.kombucha.name}
                    sx={{ width: 1, height: 1 }}
                  />
                </Box>
                <Stack marginBottom={{ xs: 1, sm: 0 }} sx={{ flexGrow: 1 }}>
                  <Box>
                    <Link href={`/kombucha/${item.kombucha._id}`} passHref>
                      <Typography
                        component="a"
                        variant="subtitle1"
                        color="text.primary"
                        fontWeight="700"
                        sx={{
                          textDecoration: "none",
                        }}
                      >
                        {item.kombucha.name} -
                        <StarIcon
                          color="primary"
                          fontSize="small"
                          sx={{ verticalAlign: "sub" }}
                        />
                        {item.rating}
                      </Typography>
                    </Link>
                  </Box>
                  <Box pb={0.5}>
                    <Link
                      href={`/breweries/${item.kombucha.brewery_slug}`}
                      passHref
                    >
                      <Typography
                        variant="body2"
                        component="a"
                        color={"text.primary"}
                        sx={{
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {item.kombucha.brewery_name} Brewery
                      </Typography>
                    </Link>
                  </Box>
                  <Box sx={{ fontStyle: "italic" }}>
                    <RevealText text={item.comment} maxLength={75} />
                  </Box>
                </Stack>
                <Stack alignItems="flex-end" spacing={1}>
                  <Box display="flex" alignItems="center">
                    <Link href={`/user/${item.username}`} passHref>
                      <Avatar
                        src={item.userAvatar}
                        alt={item.username}
                        component="a"
                      />
                    </Link>

                    <Link href={`/user/${item.username}`} passHref>
                      <Typography
                        variant="h6"
                        component="a"
                        color={"text.secondary"}
                        fontWeight="500"
                        sx={{ pl: 1 }}
                      >
                        {item.username}
                      </Typography>
                    </Link>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Reviewed:{" "}
                    {item.insertTime.slice(0, item.insertTime.lastIndexOf("T"))}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecentItemList;
