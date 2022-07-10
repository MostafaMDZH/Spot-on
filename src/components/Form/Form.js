import React from "react";
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import RangeInput from "../RangeInput/RangeInput";
import SelectInput from "../SelectInput/SelectInput";
import './Form.css';


export default function Form({
        currency,
        distance,
        fuelMeasurement,
        fuelCost,
        onCalculate
    }){

    //cookie:
    const cookies = new Cookies();
    let updateTime;

    //states:
    const [typeOfOwnership          , setTypeOfOwnership          ] = useState(cookies.get('Type of Ownership'           ));
    const [purchasePrice          , setPurchasePrice          ] = useState(cookies.get('Purchase Price'           ));
    const [yearsofOwnership       , setYearsofOwnership       ] = useState(cookies.get('Years of Ownership'       ));
    const [roadTax                , setRoadTax                ] = useState(cookies.get('Road Tax'                 ));
    const [instalment             , setInstalment             ] = useState(cookies.get('Instalment'               ));
    const [insurance              , setInsurance              ] = useState(cookies.get('Insurance'                ));
    const [warranty               , setWarranty               ] = useState(cookies.get('Warranty'                 ));
    const [maintenance            , setMaintenance            ] = useState(cookies.get('Maintenance'              ));
    const [mileage                , setMileage                ] = useState(cookies.get('Mileage'                  ));
    const [fuelConsubtion         , setFuelConsubtion         ] = useState(cookies.get('Fuel Consubtion'          ));
    const [serviceAverageCost     , setServiceAverageCost     ] = useState(cookies.get('Service Average Cost'     ));
    const [serviceMileage         , setServiceMileage         ] = useState(cookies.get('Service Mileage'          ));
    const [askingPrice            , setAskingPrice            ] = useState(cookies.get('Asking Price'             ));

    //calcDepreciation:
    const calcDepreciation = () => {
        return (purchasePrice - askingPrice) / yearsofOwnership;
    }
    
    //calcTaxAndInsurance:
    const calcTaxAndInsurance = () => {
        return (roadTax*1 + insurance*1);
    }
    
    //calcTotalServiceCost:
    const calcTotalServiceCost = () => {
        return (mileage / serviceMileage) * serviceAverageCost;
    }
    
    //calcTotalFuelCost:
    const calcTotalFuelCost = () => {
        if(fuelMeasurement[0] === 'MPG')
            return (mileage / fuelConsubtion) * fuelCost;
        return (mileage / 100) * fuelConsubtion * fuelCost;
    }
    
    //calcCosts:
    const calcCosts = () => {

        // //calc:
        // let depreciation    = calcDepreciation();
        // let taxAndInsurance = calcTaxAndInsurance();
        // let serviceCost     = calcTotalServiceCost();
        // let fuelCost        = calcTotalFuelCost();

        // //total:
        // let total = (
        //     1*depreciation           +
        //     1*taxAndInsurance        +
        //     1*warrantyAndMaintenance +
        //     1*serviceCost            +
        //     1*fuelCost
        // );

        // //return:
        // let data = {
        //     perDistance: (Math.round((total / mileage) * 100) / 100),
        //     daily:       (Math.round((total / 365) * 10) / 10),
        //     monthly:      Math.round((total / 12)),
        //     yearly:       Math.round(total),
        //     chart: [
        //         { name: 'Dep', title: 'Depreciation'           , value: Math.round(depreciation           )},
        //         { name: 'T&I', title: 'Tax & Insurance'        , value: Math.round(taxAndInsurance        )},
        //         { name: 'W&M', title: 'Warranty & Maintenance' , value: Math.round(warrantyAndMaintenance )},
        //         { name: 'Ser', title: 'Servce'                 , value: Math.round(serviceCost            )},
        //         { name: 'Fue', title: 'Fuel'                   , value: Math.round(fuelCost               )},
        //     ]
        // }
        // onCalculate(data);
    }

    //onChange:
    const onChange = (name, value, stateUpdater) => {
        updateTime = Date.now();
        setTimeout(() => {
            let currentTime = Date.now();
            if(currentTime >= (updateTime + 500)){
                cookies.set(name, value, { path: '/' });
                stateUpdater();
            }
        }, 500);
    };

    useEffect(()=>{
        calcCosts();
    }, [
        distance,
        fuelMeasurement,
        fuelCost,
        purchasePrice,
        yearsofOwnership,
        roadTax,
        insurance,
        warranty,
        maintenance,
        mileage,
        fuelConsubtion,
        serviceAverageCost,
        serviceMileage,
        askingPrice
    ]);

    //render:
    return (
        <div className="Form">
            <div className="column">
                <RangeInput 
                    name         = {'Purchase Price'}
                    title        = {typeOfOwnership === 'Lease' ? 'Down Payment' : 'Purchase Price'}
                    defaultValue = {purchasePrice}
                    rangeWidth   = {200000}
                    step         = {1000}
                    unit         = {currency[1]}
                    minMaxUnit   = {currency[1]}
                    onChange     = {(name, value) => onChange(name, value, () => setPurchasePrice(value))}
                    comment      = {
                        <SelectInput
                            name          = {'Type of Ownership'}
                            title         = {''}
                            value         = {typeOfOwnership}
                            options       = {['Lease', 'Buy']}
                            comment       = {''}
                            customClasses = {'inline'}
                            onChange      = {(name, value) => onChange(name, value, () => setTypeOfOwnership(value))}
                        />
                    }
                />
                <div className="selectorsWrapper">
                    <SelectInput
                        name          = {'Years of Ownership'}
                        title         = {typeOfOwnership === 'Lease' ? 'Lease Term' : 'Years of Ownership'}
                        value         = {yearsofOwnership}
                        options       = {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
                        comment       = {'years'}
                        customClasses = {''}
                        onChange      = {(name, value) => onChange(name, value, ()=>setYearsofOwnership(value))}
                    />
                    <SelectInput
                        title         = {'Road Tax'}
                        value         = {roadTax}
                        options       = {[0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900]}
                        comment       = {currency[1] + ' per year'}
                        customClasses = {''}
                        onChange      = {(name, value) => onChange(name, value, () => setRoadTax(value))}
                    />
                </div>
                <RangeInput
                    title        = {'Instalment'}
                    defaultValue = {instalment}
                    rangeWidth   = {3000}
                    step         = {100}
                    unit         = {currency[1]}
                    minMaxUnit   = {currency[1]}
                    comment      = {'per month'}
                    isDisable    = {typeOfOwnership !== 'Lease'}
                    onChange     = {(name, value) => onChange(name, value, () => setInstalment(value))}
                />
                <RangeInput
                    title        = {'Insurance'}
                    defaultValue = {insurance}
                    rangeWidth   = {3000}
                    step         = {100}
                    unit         = {currency[1]}
                    minMaxUnit   = {currency[1]}
                    comment      = {'per year'}
                    onChange     = {(name, value) => onChange(name, value, () => setInsurance(value))}
                />
                <RangeInput
                    title        = {'Warranty'}
                    defaultValue = {warranty}
                    rangeWidth   = {3000}
                    step         = {100}
                    unit         = {currency[1]}
                    minMaxUnit   = {currency[1]}
                    comment      = {'per year'}
                    onChange     = {(name, value) => onChange(name, value, () => setWarranty(value))}
                />
            </div>
            <div className="column">
                <RangeInput
                    title        = {'Maintenance'}
                    defaultValue = {maintenance}
                    rangeWidth   = {50000}
                    step         = {500}
                    unit         = {currency[1]}
                    minMaxUnit   = {currency[1]}
                    comment      = {'per year'}
                    onChange     = {(name, value) => onChange(name, value, () => setMaintenance(value))}
                />
                <RangeInput
                    title        = {'Mileage'}
                    defaultValue = {mileage}
                    rangeWidth   = {30000}
                    step         = {1000}
                    unit         = {distance[1]}
                    minMaxUnit   = {''}
                    comment      = {'per year'}
                    onChange     = {(name, value) => onChange(name, value, () => setMileage(value))}
                />
                <RangeInput
                    title        = {'Fuel Consubtion'}
                    defaultValue = {fuelConsubtion}
                    rangeWidth   = {fuelMeasurement[0] === 'MPG' ? 50 : 20}
                    step         = {1}
                    unit         = {fuelMeasurement[1]}
                    minMaxUnit   = {''}
                    comment      = {fuelMeasurement[0]}
                    onChange     = {(name, value) => onChange(name, value, () => setFuelConsubtion(value))}
                />
                <RangeInput 
                    title        = {'Service Average Cost'}
                    defaultValue = {serviceAverageCost}
                    rangeWidth   = {2000}
                    step         = {50}
                    unit         = {currency[1]}
                    minMaxUnit   = {currency[1]}
                    onChange     = {(name, value) => onChange(name, value, () => setServiceAverageCost(value))}
                    comment      = {
                        <SelectInput
                            name          = {'Service Mileage'}
                            title         = {'per'}
                            value         = {serviceMileage}
                            options       = {[1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,20000]}
                            comment       = {distance[0].toLowerCase() + (distance[0] === 'Mile' ? 's' : '')}
                            customClasses = {'inline'}
                            onChange      = {(name, value) => onChange(name, value, () => setServiceMileage(value))}
                        />
                    }
                />
                <RangeInput
                    name         = {'Asking Price'}
                    title        = {typeOfOwnership === 'Lease' ? 'Residual Value' : 'Asking Price'}
                    defaultValue = {askingPrice}
                    rangeWidth   = {200000}
                    step         = {1000}
                    unit         = {currency[1]}
                    minMaxUnit   = {currency[1]}
                    comment      = {'after ' + yearsofOwnership + ' year' + (yearsofOwnership > 1 ? 's' : '') + ' and '
                                 + (mileage * yearsofOwnership) + ' ' + distance[0].toLowerCase() + (distance[0] === 'Mile' ? 's' : '')}
                    onChange     = {(name, value) => onChange(name, value, () => setAskingPrice(value))}
                />
            </div>
        </div>
    );

}