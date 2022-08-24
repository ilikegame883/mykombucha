import Link from "next/link";
import { Box, Tabs, Tab } from "@mui/material";

const NextLinkTab = ({ label, href, value }) => {
  //wrap next Link component to Tab component for navigation
  //pass in value to Tab component so it can match with the current state of the page
  return (
    <Link href={href} passHref>
      <Tab
        component="a"
        label={label}
        value={value}
        sx={{ fontSize: "16px", fontWeight: 700 }}
      />
    </Link>
  );
};

const ExploreTabs = ({ children, category, tabs, explore }) => {
  return (
    <>
      <Box sx={{ width: "100%" }} display="flex" flexDirection="column">
        <Box mb={2}>
          {/* //Tabs children must have prop named value */}
          <Tabs
            value={category}
            aria-label="explore kobmucha tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTabs-scrollButtons.Mui-disabled": {
                opacity: 0.3,
              },
            }}
          >
            {tabs.map((tab) => (
              <NextLinkTab
                key={tab}
                label={tab.toUpperCase()}
                href={`/${explore.toLowerCase()}/explore/${tab}/1`}
                value={tab}
              />
            ))}
          </Tabs>
        </Box>
        {children}
      </Box>
    </>
  );
};

export default ExploreTabs;
