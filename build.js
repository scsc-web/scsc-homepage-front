/* eslint-env node */

const fs = require('fs')
const path = require('path')
const sass = require('node-sass')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

webpack(webpackConfig, (err, stats) => {
  if (err) throw err
  console.log()
  console.log(stats.toString({
    colors: true
  }))
})

const sassFiles = fs.readdirSync(path.resolve(__dirname, 'src/stylesheets'))
if (sassFiles) {
  console.log('\n' + sass.info + '\n')
  sassFiles.forEach((value, index, array) => {
    if (/^.*\.scss$/.test(value)) {
      sass.render({
        file: path.resolve(__dirname, 'src/stylesheets', value)
      }, (err, result) => {
        if (err) throw err
        const outputFileName = value.replace(/\.scss$/, '.css')
        fs.writeFile(path.resolve(__dirname, 'dist', outputFileName), result.css, (err) => {
          if (err) throw err
        })
        console.log('File: ' + value)
        console.log('Output file: ' + outputFileName)
        console.log('Built at: ' + new Date(result.stats.end).toTimeString())
        console.log('Duration: ' + result.stats.duration + 'ms')
        console.log('Included Files')
        result.stats.includedFiles.forEach((value, index, array) => {
          console.log('+ ' + value)
        })
        console.log()
      })
    }
  })
} else {
  console.log('\nNo .scss files were found.')
}
