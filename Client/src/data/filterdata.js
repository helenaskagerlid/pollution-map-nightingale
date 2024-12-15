//Filtreringsfunktion för att filterara ut X antal rader i en CSV-fil

import fs from "fs";
import csvParser from "csv-parser";
//Man måste installera csv parser för detta att funka (gissar det räcker med npm i här)
import { writeToPath } from "@fast-csv/format";

//Lägg in den fil med data i mappen data som vi vill ska filtreras, ex New Zeland
//ändra om här nedan till det aktuella landet som ska filtreras
//Den andra raden, output är för filen som kommer skapas med de filtrerade raderna
const inputFilePath = "./newzealand.csv";
const outputFilePath = "./newzealandData.csv";

const filteredData = [];

fs.createReadStream(inputFilePath)
  .pipe(csvParser({ headers: false }))
  .on("data", (row) => {
    console.log(row);
    //Här skriver vi namnet på landet så att det matchar exakt med som det står i datan
    if (row[0] === "New Zealand") {
      filteredData.push(row);
    }
  })
  .on("end", () => {
    const sampledData = filteredData.filter(
      //Här där det nu står 14 ändrar vi till den mängd med rader vi vill ha.
      //Jag har nu det sista kört en tiondel av storleken på datans fil.
      //Alltså om det står 140 kb på csv filens storlek skriver jag 14 här nedan
      (_, index) => index % Math.floor(filteredData.length / 14) === 0
    );

    writeToPath(outputFilePath, sampledData, { headers: false })
      .on("finish", () => {
        console.log(`Filtreringen är klar! Data sparad i ${outputFilePath}`);
      })
      .on("error", (err) => {
        console.error("Fel vid skrivning till fil:", err);
      });
  });
