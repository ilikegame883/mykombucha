/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import useSWR from "swr";
import {
  Box,
  useTheme,
  Typography,
  Avatar,
  Grid,
  CircularProgress,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Stack,
} from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";

const fetcher = (url) => fetch(url).then((r) => r.json());

const TopRaters = ({ slug }) => {
  const theme = useTheme();

  const { data: topRaters } = useSWR(
    `/api/breweries/${slug}/top-users`,
    fetcher
  );

  if (!topRaters) return <CircularProgress />;
  return (
    <Box pt={1}>
      <Box>
        <Typography
          variant="h6"
          align="center"
          color="text.primary"
          fontWeight="500"
          gutterBottom
        >
          Top Raters
        </Typography>
      </Box>
      <Divider />
      {!topRaters.length && (
        <Stack alignItems="center" py={2} spacing={2}>
          <FindInPageOutlinedIcon
            color="primary"
            sx={{ fontSize: 84, opacity: 0.3 }}
          />
          <Typography variant="body1" color="text.primary">
            There are no top raters yet.
          </Typography>
        </Stack>
      )}
      <Grid container>
        {topRaters.map(({ total_reviews, user }, i) => (
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
            <Box p={1}>
              <Box>
                <ListItem component="div" sx={{ p: 0, pl: 1 }}>
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ margin: 0 }}
                    primary={
                      <>
                        <Link href={`/users/${user.username}`} passHref>
                          <Typography
                            component="a"
                            variant="body1"
                            color="text.primary"
                            fontWeight="500"
                            sx={{
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            {user.username}
                          </Typography>
                        </Link>
                        <Typography variant="body2" color="text.secondary">
                          {total_reviews} Reviews
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopRaters;
