import { Container, HStack, VStack, Image, Heading, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import "../styling/home.scss"
import axios from 'axios'
import { server } from '../index'
import Ghumo from "./Ghumo"
import '../styling/coin.scss'
const ExchangePage = () => {

  const [exchange, setExchange] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);

  const btnArr = new Array(14).fill(1);

  const changePage =(pageno) =>{
    setPage(pageno);
    setloading(true);  
  }



  useEffect(() => {
    const fetchExchange= async() => {
      const {data} = await axios.get(`${server}/exchanges?page=${page}`);
      // console.log(data);
      setExchange(data);
      setloading(false);
    };
    fetchExchange();
  }, [])
  

  return (
    <>
      <div className='hd'>Exchanges</div>
      <Container maxW={'container.xl'} >
        {
          loading ? <Ghumo/> : (
            <>
            <HStack flexWrap={'wrap'}>
              {
                exchange.map((i)=>(
                  <ExhangeCards key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
                ))
              }
            </HStack>
            
            <HStack display={'flex'} justifyContent='center' flexWrap={'wrap'} padding='10px' >
              {
                btnArr.map((item,index) => (
                  <Button key={index} h={'2rem'} bgColor={"purple.200"} p='2'color={'black'} margin='4px' onClick={() => changePage(index+1)}>{1+index}</Button>
                ))
              }
              
            </HStack>

            </>
          )
        }

      </Container>
      
    </>
  )
}


const ExhangeCards = ({name , img , rank , url}) =>(
  <a href={url} target={'blank'} className='mar' >
    <VStack w='52' shadow={'lg'} padding='8' border={'lg'} transition='all 0.3s' margin={'4'} css={{
      "&:hover":{
        transform:"scale(1.1)"
      }
    }} >
      <Image src={img} h={'10'} w={'10'} objectFit={'contain'} alt='imge' />
      <Heading fontSize={'md'} noOfLines={'1'} >{name}</Heading>
      <h3>{rank}</h3>
    </VStack>

  
  </a>
);

export default ExchangePage