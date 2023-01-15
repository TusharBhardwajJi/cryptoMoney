import { Container, HStack, VStack, Image, Heading,  } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import "../styling/home.scss"
import axios from 'axios'
import { server } from '../index'
import Ghumo from "./Ghumo"
import ErrorComponent from './ErrorComponent'
import { Link } from 'react-router-dom'
import { Text , Button } from '@chakra-ui/react'
import "../styling/coin.scss"

const Coins = () => {

  const [coins, setcoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [currency , setcurrent] = useState('inr');
  const currency_sym = currency==='inr'?'₹' : '$';
  const [page, setPage] = useState(1);

  // const btnArr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  const btnArr = new Array(14).fill(1);

  const changePage =(pageno) =>{
    setPage(pageno);
    setloading(true);  
  }

  useEffect(() => {

    const fetchfunc= async() => {
      try {

          const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
          // console.log(data);
          setcoins(data);
          setloading(false);
          seterror(false);
          
        } catch (err) {
          
          seterror(true);
          setloading(false);
          // console.log('error orr')
          
        }
      };
    fetchfunc();
      
  }, [currency , page])
  
  if(error) return( <ErrorComponent msg={'OOPS.. unable to fetch coins'} />);
  

  return (
    <>
      <div className='hd'>Crypto Curriences</div>
      <Container maxW={'container.xl'} >
        {
          loading ? <Ghumo/> : (
            <>
            <HStack flexWrap={'wrap'}>
              {
                coins.map((i)=>(
                  <CoinCards key={i.id} id={i.id} name={i.name} img={i.image} symbol={i.symbol} price={i.current_price}  currency_sym={currency_sym} />
                ))
              }
            </HStack>

            {/*  esma button bhot sare bnke overflowx -auto  */}
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


const CoinCards = ({id , name , img , symbol , price , currency_sym }) =>(
  <Link to={`/coins/${id}`} target={'blank'} className="mar" >
    <VStack w='52'  shadow={'lg'} padding='8' border={'lg'} transition='all 0.3s' margin={'4'} css={{
      "&:hover":{
        transform:"scale(1.1)"
      }
    }} >
      <Image src={img} h={'10'} w={'10'} objectFit={'contain'} alt='imge' />
      <Text  fontWeight={'bold'}  fontFamily='sans-serif' textTransform={'uppercase'} paddingTop='5px' > {symbol}</Text>
      <Heading color={'purple.400'} fontSize={'md'} noOfLines={'1'} >{name}</Heading>
      <h3>{currency_sym} {price}</h3>
    </VStack>


  
  </Link>
);

export default Coins