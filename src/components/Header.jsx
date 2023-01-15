import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    VStack,
  } from '@chakra-ui/react'

import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

import {BiMenuAltLeft} from 'react-icons/bi'
const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
        <Button
            pos={'fixed'}
            top={'4'}
            left={'4'}
            colorScheme = "purple"
            p={'0'}
            w={'10'}
            h={'10'}
            borderRadius='full'
            onClick={onOpen}
            zIndex='overlay'
        ><BiMenuAltLeft/></Button>

        <Drawer isOpen={isOpen} placement='left' onClose={onClose} >
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>MYdrawer</DrawerHeader>
                <DrawerBody>
                    <VStack >
                        <Button onClick={onClose} variant={'ghost'} colorScheme="purple" >
                            <Link to={'/'} >home</Link>
                        </Button>

                        <Button onClick={onClose} variant={'ghost'} colorScheme="purple">
                            <Link to={'/exchanges'} >Coin Exhanges</Link>

                        </Button>
                        <Button onClick={onClose} variant={'ghost'} colorScheme="purple">
                            <Link to={'/coins'} >Coins</Link>
                        </Button>
                        <ColorModeSwitcher/>

                        
                    </VStack>

                </DrawerBody>


            </DrawerContent>
        </Drawer>


    </>
  );
}

export default Header;