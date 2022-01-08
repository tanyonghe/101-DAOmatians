import React from 'react';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Flex, Center, VStack, StackDivider, Text } from '@chakra-ui/react'
import { Image, Button, Box, ButtonGroup, CircularProgress  } from '@chakra-ui/react'
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader , PopoverArrow , PopoverCloseButton , PopoverBody, PopoverFooter } from '@chakra-ui/react'
import useSWR from 'swr';
import { gql } from 'graphql-request';
import Layout from "../../../components/Layout/Layout";
import Papa from 'papaparse'
import _ from 'lodash';

const DynamicVotesChart = dynamic(() =>
  import('../../../components/VotesChart').then((mod) => mod.VotesChart)
)

const Proposal = () => {
  const router = useRouter()
  const { space, proposal } = router.query

  const [rows, setRows] = React.useState([])
  const [totalVP, setTotalVP] = React.useState(0.0)
  const possibleChoices = new Set()  

  React.useEffect(() => {
    if(!proposal) {
      return;
    }
    async function getData() {
      const response = await fetch('/static/data/votes_over_time.csv')
      const reader = response.body.getReader()
      const result = await reader.read() 
      const decoder = new TextDecoder('utf-8')
      const csv = decoder.decode(result.value) 
      const results = Papa.parse(csv, { header: true })
      const rows = results.data.filter(item => item.proposal_id && item.proposal_id == proposal) 

      let tempTotalVP = 0.0;       
      rows.forEach(function(item) {
        possibleChoices.add(item.choice_string)
        tempTotalVP += parseFloat(item.vp)
      })
      setTotalVP(tempTotalVP)
      setRows(rows)
    }
    getData()  

  }, [proposal])



  if (!_.isEmpty(rows) && !_.isEmpty(possibleChoices)) {
    return (
      <Box display={"flex"} justifyContent={"center"}>
        <CircularProgress isIndeterminate mt={5} />
      </Box>
    );
  }


  const URL = "https://hub.snapshot.org/graphql";       


  const votesQuery = gql`
  {
    votes(first: 10, skip: 0, where: {voter: "0xd26a3f686d43f2a62ba9eae2ff77e9f516d945b9"}, orderBy: "created", orderDirection: desc) {
      id
      voter
      created
      proposal {
        id
      }
      choice
      space {
        id
      }
    }
  }
`;

  return (
    <Layout>


      <Flex>
        <Center flex='1'>
          <Text>
            <Center>Total Proposal Voting Power</Center>
            <Center>{totalVP}</Center>
          </Text> 
        </Center>
      </Flex>

      <Flex color='white'>
        <Center flex='1'>
          {<DynamicVotesChart votes={rows} choices={possibleChoices} />}
        </Center>
      </Flex>

    </Layout>
  )
}

export default Proposal