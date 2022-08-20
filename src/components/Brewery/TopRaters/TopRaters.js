/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import {
  Box,
  useTheme,
  Typography,
  Avatar,
  Grid,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Stack,
} from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";

const TopRaters = ({ topRaters }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box bgcolor="#F7F9FC" py={1}>
        <Typography
          variant="h6"
          align="center"
          color="text.primary"
          fontWeight="500"
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
            <ListItem sx={{ py: 1.5, px: 2 }}>
              <ListItemAvatar>
                <Avatar src={user.avatar.image} />
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopRaters;
