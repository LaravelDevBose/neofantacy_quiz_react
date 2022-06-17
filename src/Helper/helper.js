export const API_URL = 'https://quizadmin.neofantasy.io/api';

// export function hideMyModal(modalId) {
//   $(`${modalId}`).hide();
//   $("body").removeAttr("class");
//   $("body").removeAttr("style");
//   $(".modal-backdrop").remove();
// }

// export function openMyModal(modalId) {
//   $(`${modalId}`).open();
// }

var token;

export function setToken(tokenString) {
	token = tokenString;
	localStorage.setItem('token', JSON.stringify(token));
}

export function getToken() {
	if (!token) {
		token = JSON.parse(localStorage.getItem('token'));
	}

	return token;
}

export function removeToken() {
	token = '';
	localStorage.removeItem('token');
}

export const fetchJsonData = async (url) => {
	return fetch(url)
		.then((response) => response.json())
		.then((response) => {
			return response;
		});
};

// var nftData;

// export const setNftData = async (data) => {
//   nftData = JSON.stringify(data);
//   localStorage.setItem("nft_data", JSON.stringify(data));
// };

// export const getNftData = async () => {
//   if (!nftData) {
//     nftData = JSON.parse(localStorage.getItem("nft_data"));
//     // nftData = JSON.parse(nftData);
//   }

//   return nftData;
// };

const Web3 = require('web3');
const web3 = new Web3(window.ethereum);
const isMetaMaskInstalled = () => {
	//Have to check the ethereum binding on the window object to see if it's installed
	const { ethereum } = window;

	return Boolean(ethereum && ethereum.isMetaMask);
};

export const initialize = async () => {
	let accounts;
	const isMetaMaskConnected = () => accounts && accounts.length > 0;

	//Created check function to see if the MetaMask extension is installed
	const isMetaMaskInstalled = () => {
		//Have to check the ethereum binding on the window object to see if it's installed
		const { ethereum } = window;

		return Boolean(ethereum && ethereum.isMetaMask);
	};

	const MetamaskClientCheck = async () => {
		//Now we check to see if Metmask is installed
		if (!isMetaMaskInstalled()) {
			//If it isn't installed we ask the user to click to install it
			//onboardButton.innerText = 'Click here to install MetaMask!';
			alert('Please install MetaMask');
		} else if (!isMetaMaskConnected()) {
			//If MetaMask is installed we ask the user to connect to their wallet
			//onboardButton.innerText = 'Connect';
			onClickConnect();
		}
	};

	//const onboarding = new MetamaskOnboarding({ forwarderOrigin });
	MetamaskClientCheck();
	// nftUri();
};

export const onClickConnect = async () => {
	const { ethereum } = window;
	if (ethereum && ethereum.isMetaMask) {
		console.log('Ethereum successfully detected!');
		// Access the decentralized web!
	} else {
		console.log('Please install MetaMask!');
	}
	/*  if (window.ethereum) {
    try {
      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // await accountChange(res[0]);
    } catch (err) {
      console.error(err);
      alert("There was a problem connecting to MetaMask");
    }
  } else {
    alert("Install MetaMask");
  }*/

	// try {
	//   const { ethereum } = window;
	//   if (!isMetaMaskInstalled()){
	//     alert('Please Install Metamask');
	//   }
	//   //Will Start the MetaMask Extension
	//   let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
	//   if(accounts[0]!= ''){
	//     return accounts[0];
	//     // $("#connect_wallet").html("Connected");
	//     // $("#connect_wallet").prop( "disabled", true );
	//   }else{
	//     alert('Something Wrong. Metamask not connected');
	//     return  false;
	//   }

	// } catch (error) {
	//   console.error(error);
	// }
};
