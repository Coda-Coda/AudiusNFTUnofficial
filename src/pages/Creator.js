import React, { useState } from "react";
import {modal} from "react-bulma-components";


const Creator = (props) => {
  const [showForm, setForm] = useState(false);

  const [showSeriesRadio, setSeriesRadio] = useState();
  const [showCollectionRadio, setCollectionRadio] = useState();

  //NFT Data
  const [name, setName] = useState(undefined);
  const [nftType, setNftType] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [seriesSize, setSeriesSize] = useState(undefined);

  return (
    <div style={{ backgroundColor: "white" }}>
      <button onClick={() => setForm(true)}>Mint NFT</button>
      <div class="form-popup" id="myForm">
        {showForm && 
          <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-content">
                <p>Hello</p>
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
          </div>
        }
      </div>
    </div>
  )
};

export default Creator;
