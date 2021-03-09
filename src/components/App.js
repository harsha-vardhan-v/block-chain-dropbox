//import DStorage from '../abis/DStorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar';
import Main from './Main';
import './App.css';

import Web3 from 'web3';
import DStorage from '../abis/DStorage.json';

//Declare IPFS

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }

    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }

    else {
      window.alert('Non-Ethereum browser detected. Please install Metamask extension');
    }
  }

  async loadBlockchainData() {

    const web3 = window.web3;

    //Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});

    //Load network id
    const networkId = await web3.eth.net.getId();
    const networkData = DStorage.networks[networkId];

    //Load the DStorage contract
    if(networkData) {
      //Load the contract
      const dStorage = new web3.eth.Contract(DStorage.abi, networkData.address);
      this.setState({ dStorage });

      //load the file count variable
      const fileCount = await dStorage.methods.fileCount().call();
      console.log(fileCount);
    }

    else {
      window.alert('DStorage smart contract has not been deployed in the detected network');
    }

    this.setState({loading: false});
  }

  // Get file from user
  captureFile = event => {
  }


  //Upload File
  uploadFile = description => {

    //Add file to the IPFS

      //Check If error
        //Return error

      //Set state to loading

      //Assign value for the file without extension

      //Call smart contract uploadFile function 

  }

  //Set states
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      loading: true,
      dStorage: ''
    }

    //Bind functions
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
            />
        }
      </div>
    );
  }
}

export default App;