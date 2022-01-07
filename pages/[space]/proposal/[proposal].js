import React from 'react';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Flex, Center, VStack, StackDivider, Text } from '@chakra-ui/react'
import { Image, Button, Box, ButtonGroup  } from '@chakra-ui/react'
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader , PopoverArrow , PopoverCloseButton , PopoverBody, PopoverFooter } from '@chakra-ui/react'
import useSWR from 'swr';
import { gql } from 'graphql-request';
import Layout from "../../../components/Layout/Layout";


const DynamicVotesChart = dynamic(() =>
  import('../../../components/VotesChart').then((mod) => mod.VotesChart)
)


const Proposal = () => {
  const router = useRouter()
  const { space, proposal } = router.query

  const initialFocusRef = React.useRef()

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

  const { data, error } = useSWR(votesQuery, { revalidateOnFocus: false });

  console.log(data)


  return (
    <Layout>
      <Center>
        <Text>Proposal</Text>
      </Center>

      <Flex>
        <Center flex='1'>
          <Text>
            <Center>Number of Unique Voters</Center>
            <Center>{'137'}</Center>
          </Text>
        </Center>
        <Center flex='1'>
          <Text>
            <Center>Total Proposal Voting Power</Center>
            <Center>{'3.5 billion'}</Center>
          </Text> 
        </Center>
      </Flex>

      <Flex color='white'>
        <Center flex='1'>
          <DynamicVotesChart />
        </Center>
        <Center w='200px' bg='tomato'>
          <VStack
            spacing={4}
            align='stretch'
          >
          <Text>Top Voters</Text>

            <Popover
              initialFocusRef={initialFocusRef}
              placement='left'
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Image
                  borderRadius='full'
                  boxSize='100px'
                  src='/static/images/1.png'
                  alt='Top Voters - 1st'
                />
              </PopoverTrigger>
              <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                  Latest 10 Votes:
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <div>{data ? data.votes.map((vote) => <li>{vote.space.id}</li>) : 'loading...'}</div>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Popover
              initialFocusRef={initialFocusRef}
              placement='left'
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Image
                  borderRadius='full'
                  boxSize='100px'
                  src='/static/images/2.png'
                  alt='Top Voters - 2nd'
                />
              </PopoverTrigger>
              <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                  Latest 10 Votes:
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <div>{data ? data.votes.map((vote) => <li>{vote.space.id}</li>) : 'loading...'}</div>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Popover
              initialFocusRef={initialFocusRef}
              placement='left'
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Image
                  borderRadius='full'
                  boxSize='100px'
                  src='/static/images/3.png'
                  alt='Top Voters - 3rd'
                />
              </PopoverTrigger>
              <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                  Latest 10 Votes:
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <div>{data ? data.votes.map((vote) => <li>{vote.space.id}</li>) : 'loading...'}</div>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Popover
              initialFocusRef={initialFocusRef}
              placement='left'
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Image
                  borderRadius='full'
                  boxSize='100px'
                  src='/static/images/1.png'
                  alt='Top Voters - 4th'
                />
              </PopoverTrigger>
              <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                  Latest 10 Votes:
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <div>{data ? data.votes.map((vote) => <li>{vote.space.id}</li>) : 'loading...'}</div>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Popover
              initialFocusRef={initialFocusRef}
              placement='left'
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Image
                  borderRadius='full'
                  boxSize='100px'
                  src='/static/images/2.png'
                  alt='Top Voters - 5th'
                />
              </PopoverTrigger>
              <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                <PopoverHeader pt={4} fontWeight='bold' border='0'>
                  Latest 10 Votes:
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <div>{data ? data.votes.map((vote) => <li>{vote.space.id}</li>) : 'loading...'}</div>
                </PopoverBody>
              </PopoverContent>
            </Popover>

          </VStack>
        </Center>
      </Flex>

    </Layout>
  )
}

export default Proposal