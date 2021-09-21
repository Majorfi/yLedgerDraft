import	React, {useEffect, useState}	from	'react';
import	{IFrameEthereumProvider}		from	'@ledgerhq/iframe-provider';
import	{ethers}						from	'ethers';
import	Head							from	'next/head';
import	Web3 							from	'web3';
import	Onboard							from	'bnc-onboard';

// eslint-disable-next-line no-unused-vars
let web3;
const wallets = [
	{walletName: 'metamask', preferred: true},
	{
		walletName: 'ledger',
		rpcUrl: 'http://localhost:8545',
		// rpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${process.env.INFURA_KEY}`,
		preferred: true,
	}
];

const walletChecks = [
	{checkName: 'derivationPath'},
	{checkName: 'accounts'},
	{checkName: 'connect'},
	{checkName: 'network'},
	{checkName: 'balance'}
];


const onboard = Onboard({
	dappId: process.env.ONBOARD_KEY,
	networkId: 1,
	walletSelect: {wallets: wallets},
	walletCheck: walletChecks,
	subscriptions: {
		wallet: wallet => {
			web3 = new Web3(wallet.provider);
			web3 = new ethers.providers.Web3Provider(web3.givenProvider || web3.currentProvider);
		}
	}
});


const  ETH_VAULT = '0xa258C4606Ca8206D8aA700cE2143D7db854D168c';
async function	approveVault({provider, contractAddress, amount}, callback = () => null) {
	const	signer = provider.getSigner();
	const	contract = new ethers.Contract(
		contractAddress,
		['function approve(address to, uint256 tokenId) external'],
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await contract.approve(contractAddress, amount);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: undefined});
		} else {
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		callback({error, data: undefined});
	}
}
async function	apeInVault({provider, contractAddress, amount}, callback = () => null) {
	const	signer = provider.getSigner();
	const	contract = new ethers.Contract(
		contractAddress,
		['function deposit(uint256 amount) public returns (uint256)'],
		signer
	);

	/**********************************************************************
	**	If the call is successful, try to perform the actual TX
	**********************************************************************/
	try {
		const	transaction = await contract.deposit(amount);
		const	transactionResult = await transaction.wait();
		if (transactionResult.status === 1) {
			callback({error: false, data: undefined});
		} else {
			callback({error: true, data: undefined});
		}
	} catch (error) {
		console.error(error);
		callback({error, data: undefined});
	}
}

export default function Home() {
	const [isIframe, set_isIframe] = useState(false);
	const [ethereum, set_ethereum] = useState(undefined);
	const [provider, set_provider] = useState(undefined);
	const [balance, set_balance] = useState(0);

	async function onBoard() {
		let	stepSuccess = await onboard.walletSelect();
		if (stepSuccess) {
			stepSuccess = await onboard.walletCheck();
			if (stepSuccess) {
				const currentState = onboard.getState();
				set_balance(ethers.utils.formatEther(currentState.balance));
				set_provider(web3);
			}
		}
	}

	useEffect(() => {
		if (window.location.href.includes('embed=true')) {
			set_isIframe(true);
			set_ethereum(new IFrameEthereumProvider());
		} else {
			onBoard();
		}
	}, [typeof(window) !== 'undefined']);

	useEffect(() => {
		if (ethereum && isIframe) {
			const web3Provider = new ethers.providers.Web3Provider(ethereum);
			set_provider(web3Provider);
			const signer = web3Provider.getSigner();
			signer.getBalance().then(e => set_balance(ethers.utils.formatEther(e)));
		}
	}, [ethereum, isIframe]);

	if (isIframe) {
		ethereum?.on('accountsChanged', function (accounts) {
			if (provider) {
				const signer = provider.getSigner();
				signer.getBalance().then(e => set_balance(ethers.utils.formatEther(e)));
				console.warn(accounts);
			}
		});
	}

	return (
		<div className={'container'}>
			<Head>
				<title>{'yLedger'}</title>
				<meta name={'description'} content={'yLedger'} />
			</Head>

			<main className={'main'}>
				<button onClick={onBoard}>
					{'CONNECT'}
				</button>

				<h1 className={'title'} style={{marginTop: '4rem', marginBottom: '4rem'}}>
					{'Balance: '}<a href={'#'}>{balance}</a>
				</h1>

				<div style={{display: 'flex'}}>
					<button onClick={() => approveVault({provider, contractAddress: ETH_VAULT, amount: 1})}>
						{'APPROVE'}
					</button>
					<button
						style={{marginLeft: '2rem', marginRight: '2rem'}}
						onClick={() => apeInVault({provider, contractAddress: ETH_VAULT, amount: 1})}>
						{'DEPOSIT'}
					</button>
					<button onClick={() => alert('nop')}>
						{'WITHDRAW'}
					</button>
				</div>
			</main>
		</div>
	);
}
