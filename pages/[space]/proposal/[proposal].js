import React from "react";
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Flex, Center, VStack, StackDivider, Text } from '@chakra-ui/react'
import { Image, Button, Box, ButtonGroup  } from '@chakra-ui/react'
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader , PopoverArrow , PopoverCloseButton , PopoverBody, PopoverFooter } from '@chakra-ui/react'


const DynamicVotesChart = dynamic(() =>
  import('../../../components/VotesChart').then((mod) => mod.VotesChart)
)


const Proposal = () => {
  const router = useRouter()
  const { space, proposal } = router.query

  const initialFocusRef = React.useRef()

  return (
    <div>
      <Text>Porposal</Text>

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
              placement='bottom'
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
                  Manage Your Channels
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore.
                </PopoverBody>
                <PopoverFooter
                  border='0'
                  d='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  pb={4}
                >
                  <Box fontSize='sm'>Step 2 of 4</Box>
                  <ButtonGroup size='sm'>
                    <Button colorScheme='green'>Setup Email</Button>
                    <Button colorScheme='blue' ref={initialFocusRef}>
                      Next
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>

            <Popover
              initialFocusRef={initialFocusRef}
              placement='bottom'
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
                  Manage Your Channels
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore.
                </PopoverBody>
                <PopoverFooter
                  border='0'
                  d='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  pb={4}
                >
                  <Box fontSize='sm'>Step 2 of 4</Box>
                  <ButtonGroup size='sm'>
                    <Button colorScheme='green'>Setup Email</Button>
                    <Button colorScheme='blue' ref={initialFocusRef}>
                      Next
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>

            <Popover
              initialFocusRef={initialFocusRef}
              placement='bottom'
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
                  Manage Your Channels
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore.
                </PopoverBody>
                <PopoverFooter
                  border='0'
                  d='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  pb={4}
                >
                  <Box fontSize='sm'>Step 2 of 4</Box>
                  <ButtonGroup size='sm'>
                    <Button colorScheme='green'>Setup Email</Button>
                    <Button colorScheme='blue' ref={initialFocusRef}>
                      Next
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>

            <Popover
              initialFocusRef={initialFocusRef}
              placement='bottom'
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
                  Manage Your Channels
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore.
                </PopoverBody>
                <PopoverFooter
                  border='0'
                  d='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  pb={4}
                >
                  <Box fontSize='sm'>Step 2 of 4</Box>
                  <ButtonGroup size='sm'>
                    <Button colorScheme='green'>Setup Email</Button>
                    <Button colorScheme='blue' ref={initialFocusRef}>
                      Next
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>

            <Popover
              initialFocusRef={initialFocusRef}
              placement='bottom'
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
                  Manage Your Channels
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore.
                </PopoverBody>
                <PopoverFooter
                  border='0'
                  d='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  pb={4}
                >
                  <Box fontSize='sm'>Step 2 of 4</Box>
                  <ButtonGroup size='sm'>
                    <Button colorScheme='green'>Setup Email</Button>
                    <Button colorScheme='blue' ref={initialFocusRef}>
                      Next
                    </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover>

          </VStack>
        </Center>
      </Flex>
      <p>Space: {space}</p>
      <p>Proposal: {proposal}</p>
    </div>
  )
}

export default Proposal