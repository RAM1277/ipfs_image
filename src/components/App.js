import "./App.css";
import { useState } from "react";
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import LoadingOverlay from 'react-loading-overlay';
import styled, { css } from "styled-components";

const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGU1MzFFMmYxRTI5MUEzMjBGMEQ4RmI4YkIwZjZmM2M4OUU5YjljZDIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njk3NjEyNjgwMjksIm5hbWUiOiJpcGZzIn0.bwrL1h0z7cpUYjtz8e6EJVhOhu77GIL96RCOo4F6sWc" });

const App = () => {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const retrieveFile = (e) => {
    const data = e.target.files;

      setFile(data);

    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      client.put(file, {
        name: new Date().getTime(),
        maxRetries: 3,
      }).then((cid) => {
          setCid(cid);
          setIsLoading(false)
      });

    } catch (error) {
      console.log(`error upload ${error.message}`);
    }
  };

  const DarkBackground = styled.div`
  display: none; 
  position: fixed;  
  z-index: 999; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto;  
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4); 
  ${props =>
    props.disappear &&
    css`
      display: block; 
    `}
`;

  return (
    <div className="App">
      <header className="App-header">IPFS Project</header>
      
      <DarkBackground disappear={isLoading}>
        <LoadingOverlay
          active={true}
          spinner
        />
      </DarkBackground>

      <div className="main">
        <form onSubmit={handleSubmit}>
          <input type="file" multiple onChange={retrieveFile}  accept='image/jpg, image/png'/>
          <button type="submit" className="button">Submit</button>
        </form>
        <div className="textCid">
          <p>CID: {cid}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
