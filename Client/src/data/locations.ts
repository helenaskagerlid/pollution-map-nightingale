import { ILocations } from "../models/ILocations";
import { albaniaData } from "./albaniaData";
import { austriaData } from "./austriaData";
import { belarusData } from "./belarusData";
import { belgiumData } from "./belgiumData";
import { bosniaHerzegovinaData } from "./bosniaHerzegovinaData";
import { bulgariaData } from "./bulgariaData";
import { croatiaData } from "./croatiaData";
import { czechData } from "./czechData";
import { denmarkData } from "./denmarkData";
import { estoniaData } from "./estoniaData";
import { finlandData } from "./finlandData";
import { franceData } from "./franceData";
import { germanData } from "./germanData";
import { greeceData } from "./greeceData";
import { hungaryData } from "./hungaryData";
import { irelandData } from "./irelandData";
import { italyData } from "./italyData";
import { kosovoData } from "./kosovoData";
import { latviaData } from "./latviaData";
import { lithuaniaData } from "./lithuaniaData";
import { luxembourgData } from "./luxembourgData";
import { maltaData } from "./maltaData";
import { moldovaData } from "./moldovaData";
import { montenegroData } from "./montenegroData";
import { netherlandsData } from "./netherlandsData";
import { norwayData } from "./norwayData";
import { polandData } from "./polandData";
import { portugalData } from "./portugalData";
import { romaniaData } from "./romaniaData";
import { russiaData } from "./russiaData";
import { slovakiaData } from "./slovakiaData";
import { sloveniaData } from "./sloveniaData";
import { spainData } from "./spainData";
import { swedenData } from "./swedenData";
import { switzerlandData } from "./switzerlandData";
import { ukraineData } from "./ukraineData";
import { unitedKingdomData } from "./unitedKingdomData";

const latestAlbaniaData = albaniaData[albaniaData.length - 1];
const latestAustriaData = austriaData[austriaData.length - 1];
const latestBelarusData = belarusData[belarusData.length - 1];
const latestBelgiumData = belgiumData[belgiumData.length - 1];
const latestBosniaHerzegovinaData =
  bosniaHerzegovinaData[bosniaHerzegovinaData.length - 1];
const latestBulgariaData = bulgariaData[bulgariaData.length - 1];
const latestCroatioaData = croatiaData[croatiaData.length - 1];
const latestCzechData = czechData[czechData.length - 1];
const latestDenmarkData = denmarkData[denmarkData.length - 1];
const latestEstoniaData = estoniaData[estoniaData.length - 1];
const latestFinlandData = finlandData[finlandData.length - 1];
const latestFranceData = franceData[franceData.length - 1];
const latestGermanyData = germanData[germanData.length - 1];
const latestGreeceData = greeceData[greeceData.length - 1];
const latestHungaryData = hungaryData[hungaryData.length - 1];
const latestIrelandData = irelandData[irelandData.length - 1];
const latestItalyData = italyData[italyData.length - 1];
const latestKosovaData = kosovoData[kosovoData.length - 1];
const latestLatviaData = latviaData[latviaData.length - 1];
const latestLithuaniaData = lithuaniaData[lithuaniaData.length - 1];
const latestLuxembourgData = luxembourgData[luxembourgData.length - 1];
const latestMaltaData = maltaData[maltaData.length - 1];
const latestMoldovaData = moldovaData[moldovaData.length - 1];
const latestMontenegroData = montenegroData[montenegroData.length - 1];
const latestNetherlandsData = netherlandsData[netherlandsData.length - 1];
const latestNorwayData = norwayData[norwayData.length - 1];
const latestPolandData = polandData[polandData.length - 1];
const latestPortugalData = portugalData[portugalData.length - 1];
const latestRomaniaData = romaniaData[romaniaData.length - 1];
const latestRussiaData = russiaData[russiaData.length - 1];
const latestSlovakiaData = slovakiaData[slovakiaData.length - 1];
const latestSloveniaData = sloveniaData[sloveniaData.length - 1];
const latestSpainData = spainData[spainData.length - 1];
const latestSwedenData = swedenData[swedenData.length - 1];
const latestSwitzerlandData = switzerlandData[switzerlandData.length - 1];
const latestUkranieData = ukraineData[ukraineData.length - 1];
const latestUnitedKingdomData = unitedKingdomData[unitedKingdomData.length - 1];

export const locations: ILocations[] = [
  {
    country: "Albania",
    center: [41.3275, 19.8189],
    data: latestAlbaniaData,
  },
  {
    country: "Austria",
    center: [48.2082, 16.3738],
    data: latestAustriaData,
  },
  {
    country: "Belarus",
    center: [53.9006, 27.559],
    data: latestBelarusData,
  },
  {
    country: "Belgium",
    center: [50.8503, 4.3517],
    data: latestBelgiumData,
  },
  {
    country: "Bosnia and Herzegovina",
    center: [43.8563, 18.4131],
    data: latestBosniaHerzegovinaData,
  },
  {
    country: "Bulgaria",
    center: [42.6977, 23.3219],
    data: latestBulgariaData,
  },
  {
    country: "Croatia",
    center: [45.815, 15.9819],
    data: latestCroatioaData,
  },
  {
    country: "Czech Republic",
    center: [50.0755, 14.4378],
    data: latestCzechData,
  },
  {
    country: "Denmark",
    center: [55.6761, 12.5683],
    data: latestDenmarkData,
  },
  {
    country: "Estonia",
    center: [59.437, 24.7536],
    data: latestEstoniaData,
  },
  {
    country: "Finland",
    center: [60.1695, 24.9354],
    data: latestFinlandData,
  },
  {
    country: "France",
    center: [48.8566, 2.3522],
    data: latestFranceData,
  },
  {
    country: "Germany",
    center: [52.52, 13.405],
    data: latestGermanyData,
  },
  {
    country: "Greece",
    center: [37.9838, 23.7275],
    data: latestGreeceData,
  },
  {
    country: "Hungary",
    center: [47.4979, 19.0402],
    data: latestHungaryData,
  },
  {
    country: "Ireland",
    center: [53.3498, -6.2603],
    data: latestIrelandData,
  },
  {
    country: "Italy",
    center: [41.9028, 12.4964],
    data: latestItalyData,
  },
  {
    country: "Kosovo",
    center: [42.6629, 21.1655],
    data: latestKosovaData,
  },
  {
    country: "Latvia",
    center: [56.9496, 24.1052],
    data: latestLatviaData,
  },
  {
    country: "Lithuania",
    center: [54.6872, 25.2797],
    data: latestLithuaniaData,
  },
  {
    country: "Luxembourg",
    center: [49.6117, 6.1319],
    data: latestLuxembourgData,
  },
  {
    country: "Malta",
    center: [35.8997, 14.5146],
    data: latestMaltaData,
  },
  {
    country: "Moldova",
    center: [47.0105, 28.8638],
    data: latestMoldovaData,
  },
  {
    country: "Montenegro",
    center: [42.4304, 19.2594],
    data: latestMontenegroData,
  },
  {
    country: "Netherlands",
    center: [52.3676, 4.9041],
    data: latestNetherlandsData,
  },
  {
    country: "Norway",
    center: [59.9139, 10.7522],
    data: latestNorwayData,
  },
  {
    country: "Poland",
    center: [52.2297, 21.0122],
    data: latestPolandData,
  },
  {
    country: "Portugal",
    center: [38.7169, -9.1399],
    data: latestPortugalData,
  },
  {
    country: "Romania",
    center: [44.4268, 26.1025],
    data: latestRomaniaData,
  },
  {
    country: "Russia",
    center: [55.7558, 37.6173],
    data: latestRussiaData,
  },
  {
    country: "Slovakia",
    center: [48.1486, 17.1077],
    data: latestSlovakiaData,
  },
  {
    country: "Slovenia",
    center: [46.0569, 14.5058],
    data: latestSloveniaData,
  },
  {
    country: "Spain",
    center: [40.4168, -3.7038],
    data: latestSpainData,
  },
  {
    country: "Sweden",
    center: [59.334591, 18.06324],
    data: latestSwedenData,
  },
  {
    country: "Switzerland",
    center: [46.9481, 7.4474],
    data: latestSwitzerlandData,
  },
  {
    country: "Ukraine",
    center: [50.4501, 30.5234],
    data: latestUkranieData,
  },
  {
    country: "United Kingdom",
    center: [51.5074, -0.1278],
    data: latestUnitedKingdomData,
  },
];
