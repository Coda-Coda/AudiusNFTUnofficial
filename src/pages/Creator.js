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

  //Account Data
  const [extensionEnabled, setExtensionEnabled] = useState(undefined);
  const [allAccounts, setAllAccounts] = useState(undefined);

  
  const addToken = () =>{

    console.log(name)
    console.log(address)
    console.log(data)

    collectionId = 0;

    const tokenExtrinsic = api.tx.nft.mintUnique(collectionId, address, [{'Name':name},{'Data':data}], null, null);
    

    /*if (extensionEnabled) {
      const account = allAccounts[0];
      const injector = await web3FromSource(account.meta.source);
      payload = {signer: injector.signer};
      signer = account.address;
    } else {
      const signerKeypair = allAccounts[0];
      signer = signerKeypair;
    }*/

    const signer = props.signer;

    tokenExtrinsic.signAndSend(signer, null, ({ status }) => {
      if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`);
      }
     }).catch((error) => {
      console.log(':( transaction failed', error);
    });

  }
  

  const getTrack = (trackID) => {

    const headers = {
      Accept: "application/json",
    };

    fetch(
      `https://discoveryprovider3.audius.co/v1/tracks/${trackID}?app_name=NFTUnoffical`,
      {
        method: "GET",

        headers: headers,
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (body) {
        console.log(body);
      });

    return;
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
                const headers = {
                  Accept: "application/json",
                };

                const newData = fetch(
                  `https://discoveryprovider3.audius.co/v1/tracks/${data}?app_name=NFTUnoffical`,
                  {
                    method: "GET",

                    headers: headers,
                  }
                )
                  .then(function (res) {
                    return res.json();
                  })
                  .then(function (body) {
                    console.log(body);
                  });

                setData(newData);
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
