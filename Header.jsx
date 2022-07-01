import React from 'react';
import "./Header.css";
import {ReactComponent as Logo} from '../../assets/logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ConnectWallet from '../Connect_Wallet/Connect_Wallet'
import close from "../../assets/close.png"
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider';
function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles(theme => ({
  root:{
    backdropFilter: 'blur(15px)',
  },
  modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border:'none',
  },
  paper: {
      position: 'absolute',
      backgroundColor: 'transparent',
      border:'none',
  },
}));

function Header(){
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const providerOptions = {
    /* See Provider Options Section */
    
    binancechainwallet: {
        package: true,
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
          rpc: {
              56: "https://speedy-nodes-nyc.moralis.io/362fc40c1ab324c15e79d4da/bsc/mainnet",
          },
      },
  },
   
};



  const handleConnectWallet = async() => {
    setOpen(true);
    const web3Modal = new Web3Modal({
      //network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions
    })

    const provider =await web3Modal.connect()

    const web3 = new Web3(provider)
    
    
};



const handleConnectWalletClose = () => {
    setOpen(false);
};
  return (
    <div className="header">
        <div className='logo'>
        <Logo className="header-logo"/>
        </div>
        <div className='header-button'><button className='header-menu' onClick={handleConnectWallet}>Connect Wallet</button></div>
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={open}
              className={classes.root}
            >
            <div style={modalStyle} className={classes.paper}>
              <div className="close"><img src={close} alt="close" className='close-button' onClick={handleConnectWalletClose}/></div>
              <ConnectWallet keyValue={3}/>
            </div>
           </Modal>
    </div>
  )
}

export default Header;
