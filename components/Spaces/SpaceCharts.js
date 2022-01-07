import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import FollowsChart from "./FollowsChart";
import ProposalsChart from "./ProposalsChart";

const SpaceCharts = ({ id }) => {
  return (
    <Tabs isFitted variant="enclosed" w={"full"} h={"full"}>
      <TabList>
        <Tab>followers</Tab>
        <Tab>proposals</Tab>
      </TabList>
      <TabPanels h={"full"}>
        <TabPanel h={"full"} p={0}>
          <FollowsChart id={id} />
        </TabPanel>
        <TabPanel h={"full"} p={0}>
          <ProposalsChart id={id} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SpaceCharts;
