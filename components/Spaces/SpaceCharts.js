import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
} from "@chakra-ui/react";
import FollowsChart from "./FollowsChart";
import ProposalsChart from "./ProposalsChart";

const SpaceCharts = ({ id }) => {
  return (
    <Tabs isFitted variant="enclosed" w={"full"} h={"full"}>
      <TabList>
        <Tooltip
          label="member activity over 7 days"
          aria-label="tooltip for graph showing member activity over 7 days"
        >
          <Tab>members</Tab>
        </Tooltip>
        <Tooltip
          label="lifetime proposals consensus percentage"
          aria-label="tooltip for graph showing lifetime proposals consensus percentage"
        >
          <Tab>proposals</Tab>
        </Tooltip>
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
