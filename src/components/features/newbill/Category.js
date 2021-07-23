import React from "react";
import Electricity from "../electricity/Electricity";
import InternetTv from "../internetntv/InternetTv";
import Bpjs from "../../features/bpjs/Bpjs";
import Pdam from "../../pages/pdam/Pdam";
import Mobile from "../mobile/Mobile";
import Landline from "../landline/Landline";

export default function Category({ service }) {
  switch (service) {
    case "electricity":
      return <Electricity />;
    case "internettv":
      return <InternetTv />;
    case "bpjs":
      return <Bpjs />;
    case "pdam":
      return <Pdam />;
    case "mobile":
      return <Mobile />;
    case "landline":
      return <Landline />;
    default:
      return <></>;
  }
}
