import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'
import { Text } from '@chakra-ui/react'

const ErrorComponent = ({msg}) => {
  return (
    <Alert status='error' position={'fixed'} right='0' top='10' transform={'translateX(-50%'} width='fit-content' >
        <AlertIcon/>
        <Text>{msg}</Text>
    </Alert>
  )
}

export default ErrorComponent