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
import { TopUsersData } from "../../../types/api";

interface TopRatersProps {
  topRaters: TopUsersData[];
}

const TopRaters = ({ topRaters }: TopRatersProps) => {
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

      {!topRaters.length ? (
        <Stack alignItems="center" py={2} spacing={2}>
          <FindInPageOutlinedIcon
            color="primary"
            sx={{ fontSize: 84, opacity: 0.3 }}
          />
          <Typography variant="body1" color="text.primary">
            There are no top raters yet.
          </Typography>
        </Stack>
      ) : null}
      <Grid container>
        {topRaters.map(({ review_total, user }) => (
          <Grid
            item
            xs={12}
            key={user.username}
            sx={{
              borderBottom: `1px solid ${theme.palette.divider}`,
              "&:last-child": {
                borderBottom: 0,
              },
            }}
          >
            <ListItem sx={{ py: 1.5, px: 2 }}>
              <ListItemAvatar>
                <Avatar src={user.profile.image} />
              </ListItemAvatar>
              <ListItemText
                sx={{ margin: 0 }}
                primary={
                  <>
                    <Link href={`/users/${user._id}`} passHref>
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
                      {review_total} {review_total > 1 ? "Reviews" : "Review"}
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
