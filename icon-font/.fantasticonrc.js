module.exports = {
	inputDir: './icons_svg', // (required)
	outputDir: './dist2', // (required)
	fontTypes: ['ttf', 'woff', 'woff2', 'svg'],
	assetTypes: ['ts', 'css', 'json', 'html'],
	name: "GFLFontIcon",
	// fontsUrl: '/static/fonts',
	// formatOptions: {
	//   // Pass options directly to `svgicons2svgfont`
	//   woff: {
	// 	// Woff Extended Metadata Block - see https://www.w3.org/TR/WOFF/#Metadata
	// 	metadata: '...'
	//   },
	//   json: {
	// 	// render the JSON human readable with two spaces indentation (default is none, so minified)
	// 	indent: 2
	//   },
	//   ts: {
	// 	// select what kind of types you want to generate (default `['enum', 'constant', 'literalId', 'literalKey']`)
	// 	types: ['constant', 'literalId'],
	// 	// render the types with `'` instead of `"` (default is `"`)
	// 	singleQuotes: true
	//   }
	// },
	// Use a custom Handlebars template
	// templates: {
	//   css: './my-custom-tp.css.hbs'
	// },
	pathOptions: {
	  // ts: './src/types/icon-types.ts',
	  // json: './icon-codepoints.json'
	},
	// codepoints: {
	//   'alarm': 0xf001, // decimal representation of 0xe000
	// },
	prefix: "gfl"
	// Customize generated icon IDs (unavailable with `.json` config file)
	// getIconId: ({
	//   basename, // `string` - Example: 'foo';
	//   relativeDirPath, // `string` - Example: 'sub/dir/foo.svg'
	//   absoluteFilePath, // `string` - Example: '/var/icons/sub/dir/foo.svg'
	//   relativeFilePath, // `string` - Example: 'foo.svg'
	//   index // `number` - Example: `0`
	// }) => [index, basename].join('_') // '0_foo'
  };