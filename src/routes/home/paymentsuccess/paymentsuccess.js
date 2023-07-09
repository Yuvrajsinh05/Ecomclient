import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSearchParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const PaymentSuccess = () => {
console.log("payment component")
    const seachQuery = useSearchParams()[0]
    const navigate =useNavigate();
    const referenceNum = seachQuery.get("reference")

    useEffect(()=>{
        if(window.localStorage.ecomtoken){
          return true;
        }else{
         navigate('/')
        }
   },[])

    return (
        <Box>
            <VStack h="100vh" justifyContent={"center"}>

                <Heading textTransform={"uppercase"}> Order Successfull</Heading>

                <Text>
                    Reference No.{referenceNum}
                </Text>

            </VStack>
        </Box>
    )
}

export default PaymentSuccess