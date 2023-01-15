import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

const Ghumo = () => {
  return (
    <VStack h={'90vh'} justifyContent='center' >
        <Box transform={'scale(2)'} >
          <Spinner size={'xl'}/>
        </Box>
    </VStack>
  )
}

export default Ghumo