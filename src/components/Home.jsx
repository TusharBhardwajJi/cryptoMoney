import { background, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';
import "../styling/home.scss";
const Home = () => {
  return (

    <>
        <Heading display={'flex'} shadow={'lg'} justifyContent='center' fontSize={['2rem' , '80px']} padding={['1rem' ,'3rem']} >CryPtoMoney</Heading>


        <HStack  display={'flex'} justifyContent='center' h='60vh' flexWrap={'wrap'} >




        <Link to='/exchanges' shadow={'lg'}  >
              <VStack w='30rem' shadow={'lg'} padding='8' border={'lg'} transition='all 0.3s' margin={'4'} css={{
            "&:hover":{
              transform:"scale(1.03)",
              background :'#8080800d'
            }
          }} >
            <HStack>
              
            <Image src={'https://assets.coingecko.com/markets/images/25/small/logo_V_colour_black.png?1669177364'}  m='3' h={'20'} w={'20'} objectFit={'contain'} alt='exchanges' />
            <Image src={'https://assets.coingecko.com/markets/images/23/small/Coinbase_Coin_Primary.png?1621471875'} m='3' h={'20'} w={'20'} objectFit={'contain'} alt='exchanges' />
            <Image src={'https://assets.coingecko.com/markets/images/277/small/%E5%8E%9F%E8%89%B2.png?1650557355'} m='3' h={'20'} w={'20'} objectFit={'contain'} alt='exchanges' />
            </HStack>
            <Heading fontSize={'2rem'} fontFamily='sans-serif' p='12px 0' colorScheme={'purple'} >Exchanges</Heading>
          </VStack>
        </Link>

        <Link to='/coins' shadow={'lg'}  >
              <VStack w='30rem' shadow={'lg'} padding='8' border={'lg'} transition='all 0.3s' margin={'4'} css={{
            "&:hover":{
              transform:"scale(1.03)",
              background :'#8080800d'
            }
          }} >
            <HStack>
              
            <Image src={'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'}  m='3' h={'20'} w={'20'} objectFit={'contain'} alt='exchanges' />
            <Image src={'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880'} m='3' h={'20'} w={'20'} objectFit={'contain'} alt='exchanges' />
            <Image src={'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1547035066'} m='3' h={'20'} w={'20'} objectFit={'contain'} alt='exchanges' />
            </HStack>
            <Heading fontSize={'2rem'} fontFamily='sans-serif' p='12px 0' colorScheme={'purple'} >Cryptos</Heading>
          </VStack>
        </Link>

        </HStack>

    </>

  )
}

export default Home