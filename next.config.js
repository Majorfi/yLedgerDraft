const Dotenv = require('dotenv-webpack');

module.exports = ({
	plugins: [
		new Dotenv()
	],
	env: {
		ONBOARD_KEY: process.env.ONBOARD_KEY,
		INFURA_KEY: process.env.INFURA_KEY,
	}
});
