const { src, dest, series } = require("gulp");
const replace = require("gulp-replace");
const rename = require('gulp-rename');
const { appendText, prependText } = require('gulp-append-prepend');
const fs = require('fs')

const version = JSON.parse(fs.readFileSync('./package.json')).version;


function makeCssVars() {
    return src('./src/_design-tokens.scss')

        // Comments
        .pipe(replace(/\/\/(.*)/g, '/* $1 */'))

        // $ to --
        .pipe(replace(/\$/g, '--'))

        // var(--)
        .pipe(replace(/:(.*)--([^\s!;]+)/g, ':$1var(--$2)'))

        // calc (*)
        .pipe(replace(/:\s?var\(([^\)]+)\)\s?\*\s?([^;]+);/g, ': calc(var($1) * $2);'))
        

        .pipe(prependText(':root {'))
        .pipe(appendText('}'))
        .pipe(rename('_design-tokens.css'))
        .pipe(dest('src'))
    ;
}


function updateVersion() {    
    const files = [
        { name: "readme.md", srcFolder: "./src/", destFolder: "dist" },
        { name: "_design-tokens.scss", srcFolder: "./src/", destFolder: "dist" },
        { name: "_design-tokens.css", srcFolder: "./src/", destFolder: "dist" },
    ];

    return src(
        files.map(item => item.srcFolder + item.name)
    )
        .pipe(replace("##VERSION##", version))
        .pipe(dest((file) => {
            return files.filter(item => item.name === file.basename)[0].destFolder;
        }))
    ;
}

function updateVersionDocs() {    
    return src('./docs/public/index.html')
        .pipe(replace(/ver. \d+\.\d+\.\d+/, `ver. ${version}`))
        .pipe(dest('docs/public/'))
    ;
}



exports.default = series(makeCssVars, updateVersion, updateVersionDocs);
