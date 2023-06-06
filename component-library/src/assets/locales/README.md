# IRCC I18N workflow

## STEPS to import translations / strings

* Copy / Paste these three columns [termID] [en] [fr]" into a new workbook
* Save as "UNICODE TEXT" into this folder. (e.g. DS-Strings.txt)
* Install required packages fast-csv and dot-object
   On WORK laptop, run: npm config set registry http://njes1s7739:8081/artifactory/api/npm/eserv-web-npm
   npm install -g fast-csv@3.4.0
   npm install -g dot-object@2.1.2
## DEVS TO START FROM HERE
* To convert en.json and fr.json to DS-String.txt, run the command from \ds-sdc-dev folder: **npm run translations:toText**
* If a csv file does not exist - copy/paste DS-String.txt to excel file, and then edit the excel file with all translation updates
* After updating the csv file, to update en.json and fr.json - copy/paste the csv columns into DS-String.txt and run: **npm run translations:toJson**
* Other commands:
   Extract translation text from html to template.json: **npm run translations:extract**

### DO NOT EDIT 'en.json' or 'fr.json'

They will be automatically generated any time when running **npm run translations:extract**.

Please populate the following columns at a minimum:
termID | en | fr
|--|--|--|
 Purpose.Title | Purpose | ** FR ** Purpose|

[termID] is the JSON dot notation of the string. e.g 'Purpose.title'

# ngx-translate-extract (CLI) Usage And Options

is used to Merge the JSON files created with ngx-translate-extract to a single CSV file and vice versa.
This script was built from 'ngx-translate-extract' as a starting point.

**Usage:**
ngx-translate-extract -l &lt;languages&gt; [-i &lt;input path&gt;] [-o &lt;output path&gt;] [-s &lt;separator&gt;]
ngx-translate-extract -r -i &lt;input csv file&gt; [-o &lt;output path>] [-s &lt;separator&gt;]
ngx-translate-extract -h | --help
ngx-translate-extract -v | --version

**Options:**
&lt;languages&gt; : comma separated values of the input json files. Assumes .json extension
&lt;input path&gt; : location of the .json files. Default "./"
&lt;output path&gt; : the path of the output file. If ommited the results are printed in screen only.
&lt;separator&gt; : the separator character. Must be 1 character long. Current default is the (tab) separator.
-r : Reverse operation. Split a CSV file to multiple JSON files.
&lt; input csv file&gt; : The CSV file to be processed
&lt; output path&gt; : The target folder in wich the .json files will be created. Default "./"
