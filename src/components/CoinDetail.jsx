import { Box, Container, VStack , Text, Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, HStack, Button} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Ghumo from './Ghumo';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';
import "../styling/home.scss"

const CoinDetail = () => {

    const [coin, setcoin] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    const [currency , setcurrent] = useState('inr');
    const currency_sym = currency==='inr'?'₹' : '$';
    const [days, setdays] = useState('24h')
    const [chartArr, setChartArr] = useState([]);
    const [atl_date, setatl] = useState('');
    const [ath_date, setath] = useState('');

    const daybtn = ['24h', '7d', '14d', '30d', '60d', '200d' ,'1y', 'max'];

    const params = useParams();

    const daySwitchKaro=(key)=>{
        switch (key) {
            case '24h':
                setdays('1h');
                setloading(true);
                break;
            case '7d':
                setdays('7d');
                setloading(true);   
                break;
            case '14d':
                setdays('14d');
                setloading(true);
                break;
            case '30d':
                setdays('30d');
                setloading(true);
                break;
            case '60d':
                setdays('60d');
                setloading(true);
                break;
            case '200d':
                setdays('200d');
                setloading(true);
                break;
            case '1y':
                setdays('1y');
                setloading(true);
                break;
            case 'max':
                setdays('max');
                setloading(true);
                break;
        
            default:
                setdays('24h');
                setloading(true);
                break;
        }
    }

    useEffect(() => {

        const fetchcoin= async() => {
          try {
    
              const {data} = await axios.get(`${server}/coins/${params.id}`);
              const {data :chart_det} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);

            //   console.log(data);
              setcoin(data);
              setChartArr(chart_det.prices);
            //   console.log(chart_det.prices);
              setloading(false);
              seterror(false);
              
               setatl(( data.market_data.atl_date.inr).slice(0,10));
               setath((data.market_data.ath_date.inr).slice(0,10));

            } catch (err) {
              
              seterror(true);
              setloading(false);
            //   console.log('error orr')
              
            }
          };
        fetchcoin();
          
      }, [ params.id , days , currency ])
      
      if(error) return( <ErrorComponent msg={'OOPS.. unable to fetch coins'} />);

  return (

    <>

    <div className='hd'>{coin.id}</div>



    <Container maxW={'container.xl'}  >
        
    {
        loading ? <Ghumo/> :(
            <>
            <VStack spacing={'4'} padding='16' alignItems={'flex-start'} >
               <Text fontSize={'small'} alignSelf='center' opacity={"0.8"} >
                    Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}
               </Text>
               
               <Image src={coin.image.small} />
                
                <Stat  >
                    <StatLabel fontSize={'large'} display='flex' >{coin.name} -  <Text fontWeight={'bold'} marginLeft='4px' textTransform={'uppercase'} >  {coin.symbol}</Text></StatLabel>
                    <StatNumber>{currency_sym} {coin.market_data.current_price[currency]}</StatNumber>
                    <StatHelpText justifyContent={'flex-start'}>
                        <StatArrow type={coin.market_data.price_change_percentage_24h >0 ? "increase" : "decrease"} />
                        {coin.market_data.price_change_percentage_24h}%
                    </StatHelpText>
                </Stat>
                
                <Badge fontSize={'2xl'} borderRadius='5px' colorScheme={'purple'} >#{coin.market_cap_rank}</Badge>
                
                <CustomBar high={`${currency_sym} ${coin.market_data.high_24h[currency]}`}
                 low={`${currency_sym} ${coin.market_data.low_24h[currency]}`}
                 alltimelow={` ${currency_sym} ${coin.market_data.atl[currency]}`}
                 alltimehigh={` ${currency_sym} ${coin.market_data.ath[currency]}`}
                 alt_dt={` ${atl_date}`}
                 alh_dt={` ${ath_date}`}

                 />


            </VStack>
            <Box borderWidth={1} width='full'>
                <Chart arr={chartArr} currency={currency_sym} days={days} />
            </Box>

            <HStack p='4' flexWrap={'wrap'} justifyContent='center' marginBottom={'100px'}  >
                {
                    daybtn.map((i)=>(
                        <Button key={i} onClick={() => daySwitchKaro(i)} >{i} </Button>
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

const CustomBar =({high , low, alltimelow ,alltimehigh ,alt_dt , alh_dt}) =>(
    <VStack  w='full' >
        <Progress value={50} colorScheme={'purple'} w="full" />
        <HStack justifyContent={'space-between'} w='full' >
            <Badge children={low} colorScheme={'red'} />
            <Text fontSize={'sm'} > 24H Range  </Text>
            <Badge children={high} colorScheme={'green'}  />
        </HStack>
        <HStack  w='full' marginTop={'50px !important'} >
            <Badge fontSize={'sm'} children={`ALL time lowest price : ${alltimelow}  `} colorScheme={'red'} />
            
            <Badge fontSize={'sm'} children={`Date : ${alt_dt} `} colorScheme={'blue'} />
            
        </HStack>
        <HStack  w='full' >
            <Badge fontSize={'sm'} children={` ALL time highest price : ${alltimehigh}`} colorScheme={'green'}  />

            <Badge fontSize={'sm'} children={`Date : ${alh_dt} `} colorScheme={'blue'}  />
        </HStack>
    </VStack>
)


export default CoinDetail