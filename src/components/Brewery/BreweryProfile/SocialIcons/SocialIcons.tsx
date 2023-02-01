import { IconButton, Stack } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PublicIcon from "@mui/icons-material/Public";

const SocialIcons = ({ urls }) => {
  const { website, twitter, instagram, facebook } = urls;
  return (
    <Stack direction="row" alignItems="center">
      <a href={website} target="_blank" rel="noreferrer">
        <IconButton sx={{ pl: 0 }}>
          <PublicIcon />
        </IconButton>
      </a>
      {twitter && (
        <a href={twitter} target="_blank" rel="noreferrer">
          <IconButton>
            <TwitterIcon />
          </IconButton>
        </a>
      )}
      {instagram && (
        <a href={instagram} target="_blank" rel="noreferrer">
          <IconButton>
            <InstagramIcon />
          </IconButton>
        </a>
      )}
      {facebook && (
        <a href={facebook} target="_blank" rel="noreferrer">
          <IconButton>
            <FacebookIcon />
          </IconButton>
        </a>
      )}
    </Stack>
  );
};

export default SocialIcons;
