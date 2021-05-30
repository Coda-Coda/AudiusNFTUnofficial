import Creator from "./pages/Creator";
import Fans from "./pages/Fans";
import NFTSpace from "./pages/NFTSpace";
import Login from "./pages/Login";

import { TypeRegistry } from "@polkadot/types";
import { Api as ApiPromise } from "@cennznet/api";
import { useEffect, useState } from "react";
import {
  web3Accounts,
  web3Enable,
  web3FromSource,
} from "@polkadot/extension-dapp";
import { cennznetExtensions } from "./cennznetExtensions";
import { getSpecTypes } from "@polkadot/types-known";
import { defaults as addressDefaults } from "@polkadot/util-crypto/address/defaults";
import { Keyring } from "@polkadot/keyring";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import decode from "./utils/utils";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./components/sidebar";

const registry = new TypeRegistry();
const endpoint = "wss://nikau.centrality.me/public/ws";
const collectionName = "Centrality Team Sheep";
const collectionId = 0;

const email = "testUser@gmail.com"
const password = "123"

function NFTCollection(props) {
  const [tokenInfo, setTokenInfo] = useState(undefined);
  const [cardHovered, setCardHovered] = useState(true);
  const [nftAttribute, setNftAttribute] = useState(undefined);
  const [tokenOwner, setTokenOwner] = useState(undefined);
  const [tokenOwnerName, setTokenOwnerName] = useState(undefined);
  const { api, allAccounts, extensionEnabled } = props;
  const toggleHover = () => setCardHovered(!cardHovered);
  const addToken = async () => {
    const attributes = [{ Url: nftAttribute }, { Text: tokenOwnerName }];

    const tokenExtrinsic = api.tx.nft.mintUnique(
      collectionId,
      tokenOwner,
      attributes,
      null,
      null
    );
    let payload = {};
    let signer;
    // If extension is enabled use the first account from extension, else use keypair(rata) from Keyring to sign the transaction
    if (extensionEnabled) {
      const account = allAccounts[0];
      const injector = await web3FromSource(account.meta.source);
      payload = { signer: injector.signer };
      signer = account.address;
    } else {
      const signerKeypair = allAccounts[0];
      signer = signerKeypair;
    }

    tokenExtrinsic
      .signAndSend(signer, payload, ({ status }) => {
        if (status.isInBlock) {
          console.log(
            `Completed at block hash #${status.asInBlock.toString()}`
          );
        }
      })
      .catch((error) => {
        console.log(":( transaction failed", error);
      });
  };

  useEffect(() => {
    async function fetch() {
      const tokenInfos = await api.derive.nft.tokenInfoForCollection(
        collectionId
      );
      setTokenInfo(tokenInfos);
    }
    fetch();
  });
  return (
    <div className="nft_container">
      {tokenInfo?.map(({ tokenId, attributes, owner }) => {
        const { collectionId, seriesId, serialNumber } = tokenId;
        const key = `${collectionId.toString()}_${seriesId.toString()}_${serialNumber.toString()}`;
        attributes = attributes.toJSON();
        owner = owner.toString();
        return (
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <div>
                  <img
                    key={key}
                    width="300px"
                    height="300px"
                    src={attributes[0].Url}
                    onMouseEnter={toggleHover}
                    onMouseLeave={toggleHover}
                    alt="Not Found"
                  />
                </div>
              </div>
              <div className="flip-card-back">
                <h3>Token Number: {seriesId.toString()}</h3>
                <h3>Token Name: {attributes[1].Text}</h3>
                <h3>Token Owner:</h3>
                <p>{owner}</p>
              </div>
            </div>
          </div>
        );
      })}
      {/*<Modal*/}
            {/*    title={"Add To Collection"}*/}
            {/*    btnId={"createNFT"}*/}
            {/*    nftAttributeHandler={setNftAttribute}*/}
            {/*    tokenOwnerHandler={setTokenOwner}*/}
            {/*    tokenOwnerNameHandler={setTokenOwnerName}*/}
            {/*    addTokenHandler={addToken}*/}
      {/*/>*/}
    </div>
  );
}

async function extractMeta(api) {
  const systemChain = await api.rpc.system.chain();
  const specTypes = getSpecTypes(
    api.registry,
    systemChain,
    api.runtimeVersion.specName,
    api.runtimeVersion.specVersion
  );
  const filteredSpecTypes = Object.keys(specTypes)
    .filter((key) => typeof specTypes[key] !== "function")
    .reduce((obj, key) => {
      obj[key] = specTypes[key];
      return obj;
    }, {});
  const DEFAULT_SS58 = api.registry.createType("u32", addressDefaults.prefix);
  const DEFAULT_DECIMALS = api.registry.createType("u32", 4);
  const metadata = {
    chain: systemChain,
    color: "#191a2e",
    genesisHash: api.genesisHash.toHex(),
    icon: "CENNZnet",
    metaCalls: Buffer.from(api.runtimeMetadata.asCallsOnly.toU8a()).toString(
      "base64"
    ),
    specVersion: api.runtimeVersion.specVersion.toNumber(),
    ss58Format: DEFAULT_SS58.toNumber(),
    tokenDecimals: DEFAULT_DECIMALS.toNumber(),
    tokenSymbol: "CENNZ",
    types: filteredSpecTypes,
    userExtensions: cennznetExtensions,
  };
  return metadata;
}

function App() {
  const [api, setApi] = useState(undefined);
  const [allAccounts, setAllAccounts] = useState(undefined);
  const [extensionEnabled, setExtensionEnabled] = useState(false);
  const [signer, setGlobalSigner] = useState(undefined);
  const [userLoginHelperCount, setUserLoginHelperCount] = useState(0);


  useEffect(() => {
    console.log(userLoginHelperCount);
    console.log(!api);
    if (true) {
      const apiInstance = new ApiPromise({ provider: endpoint, registry });
      apiInstance.on("ready", async () => {
        const extensions = await web3Enable("my nft dapp");
        let allAccounts;
        let extensionEnabled = false;
        const keyring = new Keyring({ type: "sr25519" });
        var userAccount;
        if (localStorage.getItem("userEmail") == null || localStorage.getItem("userPassword") == null) {
            //Use default account
            userAccount = keyring.addFromUri("//example@gmail.com||pass");
        }
        else {
            //Use info from localstorage
            userAccount = keyring.addFromUri("//" + localStorage.getItem("userEmail") + "--" + localStorage.getItem("userPassword"));
            // console.log("When setting:");
            // console.log(localStorage.getItem("userEmail"));
            // console.log(localStorage.getItem("userPassword"));

        }


        if (extensions.length === 0) {
          // If extension is not installed use keyring to sign
          allAccounts = [userAccount];
          const signerKeypair = allAccounts[0];
          setGlobalSigner(signerKeypair);
          console.log("User Address:");
          console.log(signerKeypair.address);
        } else {
          const polkadotExtension = extensions.find(
            (ext) => ext.name === "polkadot-js"
          );
          const metadata = polkadotExtension.metadata;
          const checkIfMetaUpdated = localStorage.getItem(
            `EXTENSION_META_UPDATED`
          );
          if (!checkIfMetaUpdated) {
            const metadataDef = await extractMeta(apiInstance);
            await metadata.provide(metadataDef);
            localStorage.setItem(`EXTENSION_META_UPDATED`, "true");
          }
          allAccounts = await web3Accounts();
          if (allAccounts.length === 0) {
            // If extension is installed but has 0 accounts, use keyring to sign transaction.
            allAccounts = [userAccount];
            const signerKeypair = allAccounts[0];
            setGlobalSigner(signerKeypair);
            console.log("User Address:");
            console.log(signerKeypair.address);
          } else {
            extensionEnabled = true;
          }
        }
        setExtensionEnabled(extensionEnabled);
        setAllAccounts(allAccounts);
        setApi(apiInstance);
      });
    }
  }, [userLoginHelperCount]);

  if (!api) {
    return null;
  }

  return (
    <ChakraProvider>
      <Router>
        <Sidebar
          variant="sidebar"
        />

        <Box ml={'16rem'} padding="30px">
          <Switch>
            <Route path="/creator">
              <Creator signer={globalSigner} api={api}/>
            </Route>
            <Route path="/fans">
              <Fans signer={globalSigner} api={api}/>
            </Route>
            <Route path="/login">
              <Login userLoginHelperCount={userLoginHelperCount} setUserLoginHelperCount={setUserLoginHelperCount} />
            </Route>
            <Route path="/">
              <NFTSpace signer={globalSigner} api={api}/>
            </Route>
          </Switch>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
