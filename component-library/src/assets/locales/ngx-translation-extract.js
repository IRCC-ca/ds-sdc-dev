#!/usr/bin/env node
const version = '1.1.0-IRCC'
var dot = require('dot-object')
var fs = require('fs')
var csv = require('fast-csv')
var basepath = process.cwd()

function getArguments() {
  let params = {}
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i].substring(0, 1) === '-') {
      if (
        typeof process.argv[i + 1] !== 'undefined' &&
        process.argv[i + 1].substring(0, 1) !== '-'
      ) {
        params[process.argv[i].substring(1)] = process.argv[i + 1]
      } else {
        params[process.argv[i].substring(1)] = null
      }
    }
  }
  return params
}

function injectLangObject(lang, langObj, tableObj) {
  let flatened = dot.dot(langObj)
  let keys = Object.keys(flatened)
  for (let key of keys) {
    let source = flatened[key]
    if (typeof tableObj[key] !== 'undefined') {
      tableObj[key][lang] = source
    } else {
      tableObj[key] = {}
      tableObj[key][lang] = source
    }
  }
}

// React to easy parameter (version and help)
let params = getArguments()

if (params.hasOwnProperty('h') || params.hasOwnProperty('-help')) {
  console.log(usageMessage)
  process.exit(0)
}

if (params.hasOwnProperty('v') || params.hasOwnProperty('-version')) {
  console.log('version: ' + version)
  process.exit(0)
}

var delimiter = params['s'] ? params['s'] : '\t'
if (delimiter.length > 1) {
  console.log('Delimiter must be 1 character long')
  process.exit(1)
}

if (params.hasOwnProperty('r')) {
  //Reverse mode: CSV to JSON files
  if (params.hasOwnProperty('i')) {
    //set paths
    let sourcePath = params['i']
    //check if input path to csv is defined
    if (sourcePath === 'undefined' || sourcePath === null || sourcePath === '') {
      console.log(usageMessage)
      process.exit(0)
    }
    let destinationPath = params['o'] || ''

    //Reading the stream
    let allLangsObject = {}
    console.log('------------data---------------')
    console.log(`${basepath}/${sourcePath}`)
    console.log('------------data---------------')
    csv
      .parseFile(`${basepath}/${sourcePath}`, {
        headers: true,
        ignoreEmpty: true,
        delimiter: delimiter,
        // encoding: 'ucs2',
      })
      .on('data', function (data) {
        let termId = data['termID'].trim()
        for (let key in data) {
          let dataval = data[key]
          if (key !== 'termID') {
            if (dataval === '') {
              dataval = '** ' + key + " ** EMPTY '" + termId + "'"
            }
            allLangsObject[`${key}.${termId}`] = dataval
            console.log(`${key}.${termId}` + '\t' + dataval)
          }
        }
      })
      .on('end', function () {
        //Give depth to the flat-object. 1st level of properties of the object are each language
        let depthedAllLangsObject = dot.object(allLangsObject)
        for (let lang in depthedAllLangsObject) {
          //write language specific object to language file
          let filepath = `${basepath}/${destinationPath}/${lang}.json`
          var outputFile = fs.createWriteStream(filepath, {
            flags: 'w',
            encoding: 'utf8',
          })
          console.log(`Creating: ${filepath}`)

          outputFile.write(JSON.stringify(depthedAllLangsObject[lang], null, '\t'))
          outputFile.end()
        }
        console.log('Done...')
      })
  } else {
    console.log(usageMessage)
    process.exit(0)
  }
} else {
  // Forward mode: JSON files to CSV
  let sourcePath = params['i'] || ''
  let destinationPath = params['o']
  let langsArg = params['l']

  if (
    typeof sourcePath !== 'string' ||
    sourcePath === '' ||
    typeof langsArg !== 'string' ||
    langsArg === ''
  ) {
    console.log(usageMessage)
    process.exit(0)
  }

  let languages = langsArg.split(',')
  if (!Array.isArray(languages) || languages.length === 0) {
    console.log(usageMessage)
    process.exit(0)
  }

  // Read source files into a single CSV-ready object
  let tableObj = {}
  for (i = 0; i < languages.length; i++) {
    let langObj = require(basepath + '/' + sourcePath + '/' + languages[i] + '.json')
    injectLangObject(languages[i], langObj, tableObj)
  }

  if (typeof destinationPath === 'string') {
    var outputFile = fs.createWriteStream(destinationPath, {
      flags: 'w',
    })
  }

  //Print the CSV
  let header = '"termID"'
  for (let lang of languages) {
    header += `${delimiter}"${lang}"`
  }
  console.log(header)
  if (typeof destinationPath === 'string') {
    outputFile.write(header + '\n')
  }
  let terms = Object.keys(tableObj)
  for (let term of terms) {
    let line = `"${term}"`
    for (let lang of languages) {
      let tempText = `${tableObj[term][lang]}`

      if(tempText === '[object Object]') {
        tempText = ''
      } else {
        tempText = tempText.replace(/ "/gi,' ""')
        tempText = tempText.replace(/" /gi,'"" ')
      }

      line += `${delimiter}"${tempText}"`
    }

    console.log(line)
    if (typeof destinationPath === 'string') {
      outputFile.write(line + '\n')
    }
  }

  if (typeof destinationPath === 'string') {
    outputFile.end()
  }
}
