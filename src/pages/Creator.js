import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Form,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";




const Creator = (props) => {
  const [showForm, setForm] = useState(false);
  const [showSeries, setSeries] = useState(false);
  const [valueRadio, setValueRadio] = useState("1");

  //NFT Data
  const [name, setName] = useState(undefined);
  const [nftType, setNftType] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [seriesSize, setSeriesSize] = useState(undefined);


  return (
    <div style={{ backgroundColor: "white" }}>
      <Button onClick={() => setForm(true)}>Create NFT</Button>
      <Modal
        isOpen={showForm}
        onClose={() => setForm(false)}
        colorScheme={"gray"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <FormControl id="name" isRequired>

              {/*<FormControl isDisabled={showSeries}>
                <FormLabel>Amount of Tokens</FormLabel>
                <NumberInput min={1}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                </FormControl>*/}

              <FormLabel>NFT Name</FormLabel>
              <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />

              <FormLabel>Address</FormLabel>
              <Input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />

              <FormLabel>Data</FormLabel>
              <Input placeholder="Data" onChange={(e) => setData(e.target.value)} />

            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="blue" colorScheme="ghost" mr={3} onClick={() => {
              console.log(name)
              console.log(address)
              console.log(data)
              
              setForm(false)
              window.alert("NFT CREATED")
            }}>Create NFT</Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Creator;
