import React from 'react'
import {HStack,Avatar,Text} from '@chakra-ui/react';

const Message = ({text,uri,user="other"}) => {
  return (<div>
    <HStack alignSelf= {user==="me"? "flex-end" : "flex-start" } borderRadius={"base"} bg={"blue.50"} paddingX={"4"} paddingY={"2"}> 
    {
    user==="other" && <Avatar boxSize={"8"} src={uri}/>
    }
    
    <Text>{text}</Text>

    {
      user==="me" && <Avatar boxSize={"8"} src={uri}/> 
    }

    </HStack>
    </div>
  )
}

export default Message