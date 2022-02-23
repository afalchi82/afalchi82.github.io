Webfont generated with https://github.com/tancredi/fantasticon


1. Run `$ npm install -g fanstasticon` (first time only)
1. To avoid glyph overrides:
	1. edit the SCSS map called `$glfFontGlyphs` in `cliens_theme/static/src/scss/gfl_iconfont_fa_override.scss`
	1. Do not remove marked comments, they are used by the NodeJS script which copies these values to configure Fantasticon in the file `cliens_theme/static/src/fonts/GFLFontIcons/fantasticonrc.js`
	1. Also do not edit indicated code in `fantasticonrc.js`
1. Run from this folder: `$ node buildFont` (generates webfont using SVGs in `cliens_theme/static/src/fonts/svg`
