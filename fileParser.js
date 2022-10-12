const fs = require("fs");
const csvParser = require("csv-parse");
const getStream = require("get-stream");

const fileName = "report_v2-358024";

async function readCSV() {
  let data = [];
  //   fs.createReadStream(`./${fileName}.csv`)
  //     .pipe(csvParser.parse({ delimiter: ",", from_line: 2 }))
  //     .on("data", function (row) {
  //       // console.log(row);
  //       data.push(row);
  //     })
  //     .on("end", function () {
  //       // console.log("finished");
  //       return data;
  //     })
  //     .on("error", function (error) {
  //       console.log(error.message);
  //     });
  const parseStream = csvParser.parse({ delimiter: ",", from_line: 2 });
  data = await getStream.array(
    fs.createReadStream(`./${fileName}.csv`).pipe(parseStream)
  );
  return data;
}

module.exports = readCSV;
