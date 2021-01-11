import {ERC20_ABI, ADAI_ABI} from './abi';
import detectEthereumProvider from '@metamask/detect-provider';

export const EnableWeb3 = async () => {
    const provider = await detectEthereumProvider();
    if(provider) {
        console.log("Provider Detected!" + provider)
        establishWeb3Conenction(provider);
    } else {
        alert("Please Install Metamask!");
    }
}

function establishWeb3Conenction(provider) {
    if(provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed');
    } else {
        const Web3 = require("web3");
        const ethEnabled = () => {
            if(window.ethereum) {
                window.web3 = new Web3(window.ethereum)
                return true;
            }
            return false;
        }

        if(ethEnabled()){
            console.log("eth enabled");
        } else {
            console.log("eth not enabled");
        }
    }
}

export const RetrieveADaiBalance = async () => {
    await EnableWeb3();
    let accounts;
    let account;
    try{
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];
    } catch (error) {
        console.error(error);
        return {empty:true};
    }

    const aDaiContractAddress = "0x028171bca77440897b824ca71d1c56cac55b68a3";
    var aDaiContract = new window.web3.eth.Contract(ERC20_ABI, aDaiContractAddress);
    const balance = await aDaiContract.methods.balanceOf(account).call();
    const balanceParsed = balance / (10**18);
    const time = new Date().getTime();
 
    return {
        "balance": balanceParsed,
        "date": time,
        "account": account
    }
}