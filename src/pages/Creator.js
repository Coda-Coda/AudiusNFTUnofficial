import React, { useState } from "react";
import decode from '../utils/utils'

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
  Checkbox,
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
  const [charity, setCharity] = useState(undefined);

  //Account Data
  const [extensionEnabled, setExtensionEnabled] = useState(undefined);
  const [allAccounts, setAllAccounts] = useState(undefined);

  const signer = props.signer;

  const addToken = () =>{

    const collectionId = getCollection();

    let redCrossAddress =  '5DPLB9mDju7cVPdzgraZnmTq7uuuwUYtqY68UGqpVah1kFPu';
    let bespokeRoyaltySchedule = {
      entitlements: [
        (redCrossAddress, 50000), // 5%
      ]
    }
    let royalties = redCrossAddress ? charity : null;
    const tokenExtrinsic = props.api.tx.nft.mintUnique(collectionId, address, [{'Url': "https://www.google.com/search?q=audius+song+" + data}, {'Text': data}], null, royalties);


    tokenExtrinsic.signAndSend(signer, {}, ({ status }) => {
      if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`);
      }
     }).catch((error) => {
      console.log(':( transaction failed', error);
    });

  }

  const getCollection = async () => {

    


    for (let i = 0;; i++) {

      const collectionOwnerByte = await (props.api.query.nft.collectionOwner(i));
      const collectionNameByte = await (props.api.derive.nft.collectionName(i));  

      const collectionOwner = decode(collectionOwnerByte);
      const collectionName = decode(collectionNameByte);

      console.log("Collection Owner: ",collectionOwner);
      console.log("Collection name: ",collectionName);

      if((props.signer === collectionOwner) && (collectionName.contains("spinly"))){

        //Use Current Collection
        return setCollection(i);

      }
      
      //
      props.api.tx.nft.createCollection(localStorage.getItem("username") + "Spinly",{},{}).send(({ events = [], status }) => {
        console.log('Transaction status:', status.type);
  
        if (status.isFinalized) {

          console.log(events);;

          /*console.log('Completed at block hash', status.asFinalized.toHex());
          console.log('Events:');
  
          events.forEach(({ phase, event: { data, method, section } }) => {
            console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
          });*/
  
        }

      //Create collection
      //props.api.tx.nft.createCollection(collection,{},{}).send()
      //return setCollection(i);
      return setCollection(i);

      })
      
      
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


              <FormLabel>NFT Name</FormLabel>
              <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />

              <FormLabel>Initial Owner (YOU by default)</FormLabel>
              <Input
                value={signer.address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <FormLabel>Audius Track ID</FormLabel>
              <Input
                placeholder="Last digits in Audius.co url"
                onChange={(e) => setData(e.target.value)}
              />

              <FormLabel>Donate 5% of royalties to Red Cross</FormLabel>
              <Checkbox defaultIsChecked onChange={(e) => setCharity(e.target.value)}>Yes</Checkbox>

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
