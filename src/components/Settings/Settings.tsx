import { useState } from "react";
import {
  Avatar,
  Divider,
  IconButton,
  Card,
  Box,
  Tab,
  Tabs,
  Container,
  Grid,
} from "@mui/material";
import ProfileForm from "../Forms/Settings/ProfileForm";
import useSWR from "swr";
import SecurityForm from "../Forms/Settings/SecurityForm";
import ProfileImage from "./ProfileImage";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface SettingsProps {
  userId: string;
  provider: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

//TODO: Add notifications tab
const Settings = ({ userId, provider }: SettingsProps) => {
  const [tabVal, setTabVal] = useState(0);
  const { data: userData } = useSWR(`/api/users/${userId}`);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setTabVal(newValue);
  };

  if (!userData) return null; //TODO: Add loading skeleton
  return (
    <Container sx={{ mt: -8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Card sx={{ boxShadow: 3, pt: 3 }}>
            <ProfileImage userData={userData} />
            <Divider />
            <Tabs
              orientation="vertical"
              value={tabVal}
              onChange={handleChange}
              aria-label="Settings Tabs"
              TabIndicatorProps={{
                sx: {
                  left: 0,
                },
              }}
              sx={{ pt: 1, pb: 1 }}
            >
              <Tab label="Profile" {...a11yProps(0)} sx={{ fontWeight: 700 }} />
              <Tab
                label="Security"
                {...a11yProps(1)}
                sx={{ fontWeight: 700 }}
              />
            </Tabs>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Card sx={{ boxShadow: 3, pt: 3 }}>
            <TabPanel value={tabVal} index={0}>
              <ProfileForm userData={userData} />
            </TabPanel>
            <TabPanel value={tabVal} index={1}>
              <SecurityForm provider={provider} />
            </TabPanel>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
