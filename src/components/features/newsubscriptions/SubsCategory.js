import React from 'react'
import SubsBpjs from './SubsBpjs';
import SubsElectricity from './SubsElectricity';
import SubsInternetTv from './SubsInternetTv';
import SubsLandline from './SubsLandline';
import SubsMobile from './SubsMobile';
import SubsPdam from './SubsPdam';

export default function SubsCategory({ service }) {
    switch (service) {
      case 'electricity':
        return <SubsElectricity />
      case 'internettv':
          return <SubsInternetTv />
      case 'mobile':
        return <SubsMobile />
      case 'pdam':
        return <SubsPdam />
      case 'landline':
        return <SubsLandline />
      case 'bpjs':
        return <SubsBpjs />
      default:
        return <></>;
    }
    
  }