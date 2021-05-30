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
  const [collection, setCollection] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [dataURL, setDataURL] = useState(undefined);

  //Account Data
  const [extensionEnabled, setExtensionEnabled] = useState(undefined);
  const [allAccounts, setAllAccounts] = useState(undefined);

  
  const addToken = () =>{

    const collectionId = getCollection();

    const tokenExtrinsic = props.api.tx.nft.mintUnique(collectionId, address, [{'Url': dataURL}, {'Text': name}], null, null);

    const signer = props.signer;

    tokenExtrinsic.signAndSend(signer, {}, ({ status }) => {
      if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`);
      }
     }).catch((error) => {
      console.log(':( transaction failed', error);
    });

  }

  const getCollection = async () => {
    
    let search = true;
    let count = 0;

    while(search){
      
      const collectionOwner = await (props.api.derive.nft.collectionOwner(count));
      const collectionName = await (props.api.derive.nft.collectionName(count));

      if((props.signer == collectionOwner) && (collectionOwner.contains("Spinly"))){

        //use Current collection
        return setCollection(count)
      }
      else{

        //Create collection
        //will search for a collection if not given one
        props.api.tx.nft.createCollection(collection,null,null).then(console.log)
      }

      count ++;
    }


    

  }
  

  const getTrack = async (trackID) => {
    const res = await fetch(`https://discoveryprovider3.audius.co/v1/tracks/${trackID}?app_name=NFTUnoffical`)
    return res.json();
  };

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

              <FormLabel>Collection Name</FormLabel>
              <Input placeholder="Collection"
                onChange={(e) => setCollection(e.target.value)}
              />

              <FormLabel>NFT Name</FormLabel>
              <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />

              <FormLabel>Address</FormLabel>
              <Input
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />

              <FormLabel>Track ID</FormLabel>
              <Input
                placeholder="Data"
                onChange={(e) => setData(e.target.value)}
              />

            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="blue"
              colorScheme="ghost"
              mr={3}
              onClick={() => {

                
                setData(getTrack(data));
                setForm(false);

                window.alert("NFT CREATED");
              
                addToken();
              }}
            >
              Create NFT
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Creator;
