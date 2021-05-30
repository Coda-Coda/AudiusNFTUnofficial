import React, { useState } from 'react';
import { Text, UnorderedList, ListItem, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, SimpleGrid, InputRightElement, Box, Button, Form, Icon, propNames } from '@chakra-ui/react';

function setEmailToStorage(email) {
    localStorage.setItem('userEmail', email);
    console.log(email);
}

function setPasswordToStorage(password) {
    localStorage.setItem('userPassword', password);
    console.log(password);
}

function setUsernameToStorage(password) {
    localStorage.setItem('username', password);
    console.log(password);
}

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const submitForm = async () => {
        setEmailToStorage(email);
        setPasswordToStorage(password);
        setUsernameToStorage(username);
        props.setUserLoginHelperCount(props.userLoginHelperCount + 1);
    }
    return (


        <SimpleGrid columns={2} spacing={10}>
        <Box bg="white" height="80px">
        <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
        <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </FormControl>
        <FormControl id="password" isRequired value={password}>
            <FormLabel>Password</FormLabel>
            <Input placeholder="First name" type="password" onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            onClick={submitForm}
          >
            Submit
          </Button>
          <Text>  </Text>
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            onClick={() => window.open("https://cennznet-faucet-ui.centrality.me")}
          >
            Get Funds
          </Button>
        </Box>
        <Box bg="white" height="80px">
        <UnorderedList fontSize="xx-large" styleType="none">
            <ListItem >Share your music</ListItem>
            <ListItem>Connect with your favourite creator</ListItem>
            <ListItem>Find music tailored to you</ListItem>
            </UnorderedList>
        </Box>
        </SimpleGrid>
    );
}

export default Login;
