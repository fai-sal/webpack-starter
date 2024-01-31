
const path = require('path'); // Node.js module for resolving file paths

const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {

	const config = {
		mode: 'development',
		entry: {
			bundle: path.resolve(__dirname, 'src', 'index.js'),
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name][contenthash].js', // [name] is the name of the entry point,
			clean: true, // Clean the output directory before emit.
			assetModuleFilename: '[name][ext]',
		},
		devtool: 'source-map',
		devServer: {
			static: {
				directory: path.resolve(__dirname, 'dist')
			},
			port: 3000,
			open: true, 
			hot: true, 
			compress: true,
			historyApiFallback: true,
		},
		module: { // configuration regarding modules and loaders
			rules:[
				{
					test: /\.scss$/, // rule for .scss files
					use:[
						'style-loader',
						'css-loader',
						'sass-loader'
					]
				},
				{
					test: /\.js$/, // rule for .js files
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-env' ]
						}
					}
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i, // rule for images
					type: 'asset/resource',
				},
			]
		},
		plugins: [
			new HTMLWebpackPlugin({
				title: 'Webpack Starter',
				filename: 'index.html',
				template: path.resolve(__dirname, 'template.html'),
			}),
			new BundleAnalyzerPlugin(), // to analyze the bundle size
		],
	};

	if(argv.mode === 'production') {
		config.mode = 'production';
		config.devtool = false;
	}

	return config;
}
