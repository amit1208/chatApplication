import { Avatar, Box, Button, Container, HStack, VStack } from '@chakra-ui/react'
import {useState,React,useRef,useEffect} from 'react'
import Message from './Components/Message';
import {onAuthStateChanged,getAuth,GoogleAuthProvider,signInWithPopup,signOut} from"firebase/auth";
import {app} from "./firebase";
import {getFirestore,addDoc,collection,onSnapshot,query,orderBy, serverTimestamp} from "firebase/firestore"

const auth = getAuth(app);

const db= getFirestore(app);


const loginHandler =()=>{
  const provider=new GoogleAuthProvider()
 
  signInWithPopup(auth,provider);
};

const logoutHandler=()=> signOut(auth)



function App(){
  const [user, setuser] = useState(false);
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);

  const divForScroll = useRef(null)
  
  const submitHandler =async (e)=>{
    e.preventDefault()
    
    try {
     await addDoc(collection(db, "Messages"),{
        text:message,
        uid:user.uid,
        uri:user.photoURL,
        createdAt:serverTimestamp(),});
        
        setmessage("");
        divForScroll.current.scrollIntoView({behaviour:"smooth"});
      } 
      catch (error) {alert(error)}
  };


  useEffect(() => {
    const q=query (collection(db,"Messages"),orderBy("createdAt","asc"));

    const unsubscribe = onAuthStateChanged(auth,(data)=>{
     setuser (data);
    });

const unsubscribeForMessage =onSnapshot(q,(snap)=>{
  setmessages(
    snap.docs.map((item)=>{
      const id=item.id;
      return{id,...item.data()};
    })
  )
});

return()=>{
  unsubscribe();
  unsubscribeForMessage();
}
  },[]);
 
  return <Box bg="red.50">

  {user ?  ( <Container h={"100vh"} bg={"white"}>
  <VStack h={"full"} paddingY={"4"}>
  <Button onClick={logoutHandler} colorScheme='red' w={"full"}>Logout</Button>

<VStack h="full" w="full" overflowY={"auto"}> 
{
  messages.map(item=>(
    
    <Message 
    key={item.id}
    user={item.uid===user.uid?"me":"other"} 
    text={item.text} 
    uri={"item.uri"} />

  ))
}
</VStack>

<div ref={divForScroll}></div>
    <form onSubmit={submitHandler} style={{width:"100%"}}>
    <HStack>
    <input value={message} onChange={(e)=>setmessage(e.target.value)} placeholder="Enter a message.." /> 
    <Button alignSelf={"flex-end"} colorScheme={'green'} type="submit"> send</Button>
    </HStack>
    </form>
  </VStack>

</Container>) 
:  <VStack bg={"white"} justifyContent={" center"} h="100vh">
<Avatar/>
<Button onClick={loginHandler}> Sign-In with Google</Button>

</VStack>
}


</Box>
}

export default App