# Traackr coding test

## Arch

It could be everything in one file, but I've tryed to separate responsabilities in order to make the code more reusable.

I've also made every function as pure as possible to be able to easy tests them, so you might find small peaces of action 
that could be easily be merged to the main flow, but they're are out.

## Flow

1) The program starts in `src/init.js` that will receive a file name (relative to it's path)
and fetch that file using `stream/readline` to be able to processes large files in parts.
With every line of the file, it will call `src/process.js` that will handle that data (line in this case) and process it to populate the needed collections.

2) After the file was fetched, `src/init.js` will call `src/output.js` that will handle the final print (wich will include the reports/lists requested, that are implemented in `src/reports.js`).

- Some constants about incoming file formating rules are defined in `arc/config.js`

### Build
`npm i`

### Execute test
The unit tests will test that the requested formats are being accomplished without using the test file.

`npm run test`

### Run with test file
`npm start`

### Run with custom file
`node init.js <FILE>`

### Run with memory override
`node --max-old-space-size=8192 init.js <FILE>`