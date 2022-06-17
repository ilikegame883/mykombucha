/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Divider, Stack } from "@mui/material";
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined";

const TopRaters = ({ topRaters }) => {
  const theme = useTheme();
  return (
    <Box pt={1}>
      <Box>
        <Typography
          variant="h6"
          align="center"
          color="text.primary"
          fontWeight="600"
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
            <Box p={2}>
              <Box>
                <ListItem component="div" disableGutters sx={{ p: 0, pl: 1 }}>
                  <ListItemAvatar>
                    <Avatar src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ margin: 0 }}
                    primary={
                      <>
                        <Link href={`/user/${user.username}`} passHref>
                          <Typography
                            component="a"
                            variant="body1"
                            color="text.primary"
                            fontWeight="600"
                            sx={{
                              textDecoration: "none",
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            {user.username}
                          </Typography>
                        </Link>
                        <Typography variant="body2" color="text.primary">
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
