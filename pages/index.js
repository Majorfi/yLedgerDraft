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

const iface = new ethers.utils.Interface([{"name":"Transfer","inputs":[{"type":"address","name":"sender","indexed":true},{"type":"address","name":"receiver","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false,"type":"event"},{"name":"Approval","inputs":[{"type":"address","name":"owner","indexed":true},{"type":"address","name":"spender","indexed":true},{"type":"uint256","name":"value","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyAdded","inputs":[{"type":"address","name":"strategy","indexed":true},{"type":"uint256","name":"debtRatio","indexed":false},{"type":"uint256","name":"rateLimit","indexed":false},{"type":"uint256","name":"performanceFee","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyReported","inputs":[{"type":"address","name":"strategy","indexed":true},{"type":"uint256","name":"gain","indexed":false},{"type":"uint256","name":"loss","indexed":false},{"type":"uint256","name":"totalGain","indexed":false},{"type":"uint256","name":"totalLoss","indexed":false},{"type":"uint256","name":"totalDebt","indexed":false},{"type":"uint256","name":"debtAdded","indexed":false},{"type":"uint256","name":"debtRatio","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateGovernance","inputs":[{"type":"address","name":"governance","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateManagement","inputs":[{"type":"address","name":"management","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateGuestList","inputs":[{"type":"address","name":"guestList","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateRewards","inputs":[{"type":"address","name":"rewards","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateDepositLimit","inputs":[{"type":"uint256","name":"depositLimit","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdatePerformanceFee","inputs":[{"type":"uint256","name":"performanceFee","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateManagementFee","inputs":[{"type":"uint256","name":"managementFee","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateGuardian","inputs":[{"type":"address","name":"guardian","indexed":false}],"anonymous":false,"type":"event"},{"name":"EmergencyShutdown","inputs":[{"type":"bool","name":"active","indexed":false}],"anonymous":false,"type":"event"},{"name":"UpdateWithdrawalQueue","inputs":[{"type":"address[20]","name":"queue","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdateDebtRatio","inputs":[{"type":"address","name":"strategy","indexed":true},{"type":"uint256","name":"debtRatio","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdateRateLimit","inputs":[{"type":"address","name":"strategy","indexed":true},{"type":"uint256","name":"rateLimit","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyUpdatePerformanceFee","inputs":[{"type":"address","name":"strategy","indexed":true},{"type":"uint256","name":"performanceFee","indexed":false}],"anonymous":false,"type":"event"},{"name":"StrategyMigrated","inputs":[{"type":"address","name":"oldVersion","indexed":true},{"type":"address","name":"newVersion","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyRevoked","inputs":[{"type":"address","name":"strategy","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyRemovedFromQueue","inputs":[{"type":"address","name":"strategy","indexed":true}],"anonymous":false,"type":"event"},{"name":"StrategyAddedToQueue","inputs":[{"type":"address","name":"strategy","indexed":true}],"anonymous":false,"type":"event"},{"name":"initialize","outputs":[],"inputs":[{"type":"address","name":"token"},{"type":"address","name":"governance"},{"type":"address","name":"rewards"},{"type":"string","name":"nameOverride"},{"type":"string","name":"symbolOverride"}],"stateMutability":"nonpayable","type":"function"},{"name":"initialize","outputs":[],"inputs":[{"type":"address","name":"token"},{"type":"address","name":"governance"},{"type":"address","name":"rewards"},{"type":"string","name":"nameOverride"},{"type":"string","name":"symbolOverride"},{"type":"address","name":"guardian"}],"stateMutability":"nonpayable","type":"function"},{"name":"apiVersion","outputs":[{"type":"string","name":""}],"inputs":[],"stateMutability":"pure","type":"function","gas":4519},{"name":"setName","outputs":[],"inputs":[{"type":"string","name":"name"}],"stateMutability":"nonpayable","type":"function","gas":107017},{"name":"setSymbol","outputs":[],"inputs":[{"type":"string","name":"symbol"}],"stateMutability":"nonpayable","type":"function","gas":71867},{"name":"setGovernance","outputs":[],"inputs":[{"type":"address","name":"governance"}],"stateMutability":"nonpayable","type":"function","gas":36338},{"name":"acceptGovernance","outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"function","gas":37610},{"name":"setManagement","outputs":[],"inputs":[{"type":"address","name":"management"}],"stateMutability":"nonpayable","type":"function","gas":37748},{"name":"setGuestList","outputs":[],"inputs":[{"type":"address","name":"guestList"}],"stateMutability":"nonpayable","type":"function","gas":37778},{"name":"setRewards","outputs":[],"inputs":[{"type":"address","name":"rewards"}],"stateMutability":"nonpayable","type":"function","gas":37808},{"name":"setDepositLimit","outputs":[],"inputs":[{"type":"uint256","name":"limit"}],"stateMutability":"nonpayable","type":"function","gas":37738},{"name":"setPerformanceFee","outputs":[],"inputs":[{"type":"uint256","name":"fee"}],"stateMutability":"nonpayable","type":"function","gas":37872},{"name":"setManagementFee","outputs":[],"inputs":[{"type":"uint256","name":"fee"}],"stateMutability":"nonpayable","type":"function","gas":37902},{"name":"setGuardian","outputs":[],"inputs":[{"type":"address","name":"guardian"}],"stateMutability":"nonpayable","type":"function","gas":39146},{"name":"setEmergencyShutdown","outputs":[],"inputs":[{"type":"bool","name":"active"}],"stateMutability":"nonpayable","type":"function","gas":39217},{"name":"setWithdrawalQueue","outputs":[],"inputs":[{"type":"address[20]","name":"queue"}],"stateMutability":"nonpayable","type":"function","gas":763893},{"name":"transfer","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"receiver"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function","gas":76733},{"name":"transferFrom","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"sender"},{"type":"address","name":"receiver"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function","gas":116496},{"name":"approve","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"spender"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function","gas":38244},{"name":"increaseAllowance","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"spender"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function","gas":40285},{"name":"decreaseAllowance","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"spender"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function","gas":40309},{"name":"permit","outputs":[{"type":"bool","name":""}],"inputs":[{"type":"address","name":"owner"},{"type":"address","name":"spender"},{"type":"uint256","name":"amount"},{"type":"uint256","name":"expiry"},{"type":"bytes","name":"signature"}],"stateMutability":"nonpayable","type":"function","gas":81237},{"name":"totalAssets","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":4123},{"name":"deposit","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"nonpayable","type":"function"},{"name":"deposit","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"_amount"}],"stateMutability":"nonpayable","type":"function"},{"name":"deposit","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"_amount"},{"type":"address","name":"recipient"}],"stateMutability":"nonpayable","type":"function"},{"name":"maxAvailableShares","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":364171},{"name":"withdraw","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"nonpayable","type":"function"},{"name":"withdraw","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"maxShares"}],"stateMutability":"nonpayable","type":"function"},{"name":"withdraw","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"maxShares"},{"type":"address","name":"recipient"}],"stateMutability":"nonpayable","type":"function"},{"name":"withdraw","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"maxShares"},{"type":"address","name":"recipient"},{"type":"uint256","name":"maxLoss"}],"stateMutability":"nonpayable","type":"function"},{"name":"pricePerShare","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":12412},{"name":"addStrategy","outputs":[],"inputs":[{"type":"address","name":"strategy"},{"type":"uint256","name":"debtRatio"},{"type":"uint256","name":"rateLimit"},{"type":"uint256","name":"performanceFee"}],"stateMutability":"nonpayable","type":"function","gas":1450351},{"name":"updateStrategyDebtRatio","outputs":[],"inputs":[{"type":"address","name":"strategy"},{"type":"uint256","name":"debtRatio"}],"stateMutability":"nonpayable","type":"function","gas":115316},{"name":"updateStrategyRateLimit","outputs":[],"inputs":[{"type":"address","name":"strategy"},{"type":"uint256","name":"rateLimit"}],"stateMutability":"nonpayable","type":"function","gas":41467},{"name":"updateStrategyPerformanceFee","outputs":[],"inputs":[{"type":"address","name":"strategy"},{"type":"uint256","name":"performanceFee"}],"stateMutability":"nonpayable","type":"function","gas":41344},{"name":"migrateStrategy","outputs":[],"inputs":[{"type":"address","name":"oldVersion"},{"type":"address","name":"newVersion"}],"stateMutability":"nonpayable","type":"function","gas":1105801},{"name":"revokeStrategy","outputs":[],"inputs":[],"stateMutability":"nonpayable","type":"function"},{"name":"revokeStrategy","outputs":[],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"nonpayable","type":"function"},{"name":"addStrategyToQueue","outputs":[],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"nonpayable","type":"function","gas":1196920},{"name":"removeStrategyFromQueue","outputs":[],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"nonpayable","type":"function","gas":23091666},{"name":"debtOutstanding","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function"},{"name":"debtOutstanding","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"view","type":"function"},{"name":"creditAvailable","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function"},{"name":"creditAvailable","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"view","type":"function"},{"name":"availableDepositLimit","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":9808},{"name":"expectedReturn","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function"},{"name":"expectedReturn","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"strategy"}],"stateMutability":"view","type":"function"},{"name":"report","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"uint256","name":"gain"},{"type":"uint256","name":"loss"},{"type":"uint256","name":"_debtPayment"}],"stateMutability":"nonpayable","type":"function","gas":937520},{"name":"sweep","outputs":[],"inputs":[{"type":"address","name":"token"}],"stateMutability":"nonpayable","type":"function"},{"name":"sweep","outputs":[],"inputs":[{"type":"address","name":"token"},{"type":"uint256","name":"amount"}],"stateMutability":"nonpayable","type":"function"},{"name":"name","outputs":[{"type":"string","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":9053},{"name":"symbol","outputs":[{"type":"string","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":8106},{"name":"decimals","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2711},{"name":"balanceOf","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":2956},{"name":"allowance","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"},{"type":"address","name":"arg1"}],"stateMutability":"view","type":"function","gas":3201},{"name":"totalSupply","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2801},{"name":"token","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2831},{"name":"governance","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2861},{"name":"management","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2891},{"name":"guardian","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2921},{"name":"guestList","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":2951},{"name":"strategies","outputs":[{"type":"uint256","name":"performanceFee"},{"type":"uint256","name":"activation"},{"type":"uint256","name":"debtRatio"},{"type":"uint256","name":"rateLimit"},{"type":"uint256","name":"lastReport"},{"type":"uint256","name":"totalDebt"},{"type":"uint256","name":"totalGain"},{"type":"uint256","name":"totalLoss"}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":10322},{"name":"withdrawalQueue","outputs":[{"type":"address","name":""}],"inputs":[{"type":"uint256","name":"arg0"}],"stateMutability":"view","type":"function","gas":3120},{"name":"emergencyShutdown","outputs":[{"type":"bool","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3041},{"name":"depositLimit","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3071},{"name":"debtRatio","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3101},{"name":"totalDebt","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3131},{"name":"lastReport","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3161},{"name":"activation","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3191},{"name":"rewards","outputs":[{"type":"address","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3221},{"name":"managementFee","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3251},{"name":"performanceFee","outputs":[{"type":"uint256","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3281},{"name":"nonces","outputs":[{"type":"uint256","name":""}],"inputs":[{"type":"address","name":"arg0"}],"stateMutability":"view","type":"function","gas":3526},{"name":"DOMAIN_SEPARATOR","outputs":[{"type":"bytes32","name":""}],"inputs":[],"stateMutability":"view","type":"function","gas":3341}]);


const  USDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
const  USDC_VAULT = '0x5f18c75abdae578b483e5f43f12a39cf75b973a9';
async function	approveVault({provider, contractAddress, amount}, callback = () => null) {
	const	signer = provider.getSigner();
	const	contract = new ethers.Contract(
		USDC,
		['function approve(address to, uint256 amount) external'],
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
		['function deposit(uint256) returns (uint256)'],
		signer
	);

	console.log(iface.getSighash("deposit(uint256) returns (uint256)"));

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
	const [balanceRaw, set_balanceRaw] = useState('');

	async function onBoard() {
		let	stepSuccess = await onboard.walletSelect();
		if (stepSuccess) {
			stepSuccess = await onboard.walletCheck();
			if (stepSuccess) {
				const currentState = onboard.getState();
				const	contract = new ethers.Contract(USDC, ['function balanceOf(address) public view returns (uint256)'], web3);
				// set_balance(ethers.utils.formatEther(currentState.balance));
				set_balance(ethers.utils.formatUnits(await contract.balanceOf(currentState.address), 6))
				set_balanceRaw((await contract.balanceOf(currentState.address)).toString())
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
			signer.getBalance().then(e => set_balance(ethers.utils.formatUnits(e, 6)));
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
					<button onClick={() => approveVault({provider, contractAddress: USDC_VAULT, amount: balanceRaw})}>
						{'APPROVE'}
					</button>
					<button
						style={{marginLeft: '2rem', marginRight: '2rem'}}
						onClick={() => apeInVault({provider, contractAddress: USDC_VAULT, amount: balanceRaw})}>
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
