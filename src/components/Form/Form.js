import { useEffect, useState } from 'react'
import Cookies                 from 'universal-cookie';
import utils                   from '../../utils/utils'
import useWindowDimensions     from '../../hooks/useWindowDimensions'
import DV                      from '../../data/defaultValues'
import RangeInput              from '../RangeInput/RangeInput';
import SelectInput             from '../SelectInput/SelectInput';
import './Form.scss';

export default function Form({
        currency,
        distance,
        fuelMeasurement,
        fuelCost,
        isDarkMode,
        onCalculate,
        onInfoVisible
    }){

    //init:
    const { height, width } = useWindowDimensions();
    const cookies = new Cookies();
    let updateTime;

    //states:
    const [typeOfOwnership    , setTypeOfOwnership    ] = useState(cookies.get('Type of Ownership'    ) || DV.TYPE_OF_OWNERSHIP    );
    const [purchasePrice      , setPurchasePrice      ] = useState(cookies.get('Purchase Price'       ) || DV.PURCHASE_PRICE       );
    const [yearsOfOwnership   , setYearsOfOwnership   ] = useState(cookies.get('Years of Ownership'   ) || DV.YEARS_OF_OWNERSHIP   );
    const [roadTax            , setRoadTax            ] = useState(cookies.get('Road Tax'             ) || DV.ROAD_TAX             );
    const [instalment         , setInstalment         ] = useState(cookies.get('Instalment'           ) || DV.INSTALMENT           );
    const [insurance          , setInsurance          ] = useState(cookies.get('Insurance'            ) || DV.INSURANCE            );
    const [warranty           , setWarranty           ] = useState(cookies.get('Warranty'             ) || DV.WARRANTY             );
    const [maintenance        , setMaintenance        ] = useState(cookies.get('Maintenance'          ) || DV.MAINTENANCE          );
    const [mileage            , setMileage            ] = useState(cookies.get('Mileage'              ) || DV.MILEAGE              );
    const [fuelConsumption    , setFuelConsumption    ] = useState(cookies.get('Fuel Consumption'     ) || DV.FUEL_CONSUMPTION     );
    const [serviceAverageCost , setServiceAverageCost ] = useState(cookies.get('Service Average Cost' ) || DV.SERVICE_AVERAGE_COST );
    const [serviceMileage     , setServiceMileage     ] = useState(cookies.get('Service Mileage'      ) || DV.SERVICE_MILEAGE      );
    const [askingPrice        , setAskingPrice        ] = useState(cookies.get('Asking Price'         ) || DV.ASKING_PRICE         );

    //calcDepreciation:
    const calcDepreciation = () => {
        let totalInstalment = 0;
        if(typeOfOwnership === 'Lease')
            totalInstalment = instalment * yearsOfOwnership * 12;
        return (purchasePrice - askingPrice + totalInstalment) / yearsOfOwnership;
    }
    
    //calcTaxAndInsurance:
    const calcTaxAndInsurance = () => {
        return (roadTax*1 + insurance*1);
    }
    
    //calcTotalServiceCost:
    const calcTotalServiceCost = () => {
        if(serviceMileage === 0) return 0;
        return (mileage / serviceMileage) * serviceAverageCost;
    }
    
    //calcTotalFuelCost:
    const calcTotalFuelCost = () => {
        if(fuelConsumption === 0) return 0;
        if(fuelMeasurement[0] === 'MPG'){
            let convertMK = 1;
            if(distance['Km'])
                convertMK = 1.60934;
            return ((mileage / convertMK) / fuelConsumption) * fuelCost;
        }else{
            let convertMK = 1;
            if(distance['Mile'])
                convertMK = 1.60934;
            return ((mileage * convertMK) / 100) * fuelConsumption * fuelCost;
        }
    }
    
    //calcCosts:
    const calcCosts = () => {

        //calc:
        let depreciation    = calcDepreciation();
        let taxAndInsurance = calcTaxAndInsurance();
        let serviceCost     = calcTotalServiceCost();
        let fuelCost        = calcTotalFuelCost();

        //total per year:
        let total = (
            1*depreciation    +
            1*taxAndInsurance +
            1*warranty        +
            1*maintenance     +
            1*serviceCost     +
            1*fuelCost
        );

        //per distance:
        let perDistance = 0;
        if(mileage > 0)
            perDistance = (Math.round((total / mileage) * 100) / 100)

        //return:
        let data = {
            perDistance: perDistance,
            daily:       (Math.round((total / 365) * 10) / 10),
            monthly:      Math.round((total / 12)),
            yearly:       Math.round(total),
            chart: [
                { name: 'Dpr', title: 'Depreciation'    , value: Math.round(depreciation    )},
                { name: 'T&I', title: 'Tax & Insurance' , value: Math.round(taxAndInsurance )},
                { name: 'Wrt', title: 'Warranty'        , value: Math.round(warranty        )},
                { name: 'Mtn', title: 'Maintenance'     , value: Math.round(maintenance     )},
                { name: 'Svc', title: 'Service'         , value: Math.round(serviceCost     )},
                { name: 'Ful', title: 'Fuel'            , value: Math.round(fuelCost        )},
            ]
        }
        onCalculate(data);

    }

    //onChange:
    const onChange = (name, value, stateUpdater) => {
        updateTime = Date.now();
        setTimeout(() => {
            let currentTime = Date.now();
            if(currentTime >= (updateTime + 300)){
                cookies.set(name, value, { path: '/', maxAge: 1000*24*60*60 });
                stateUpdater();
            }
        }, 300);
    };

    useEffect(() => {
        if(width > 1000)
            calcCosts();
    }, [
        distance,
        fuelMeasurement,
        fuelCost,
        typeOfOwnership,
        purchasePrice,
        yearsOfOwnership,
        roadTax,
        instalment,
        insurance,
        warranty,
        maintenance,
        mileage,
        fuelConsumption,
        serviceAverageCost,
        serviceMileage,
        askingPrice
    ]);

    //render:
    return (
        <div className='Form'>
            <div className='inputsContainer'>
                <RangeInput 
                    name         = {'Purchase Price'}
                    title        = {typeOfOwnership === 'Lease' ? 'Down Payment' : 'Purchase Price'}
                    defaultValue = {purchasePrice}
                    rangeWidth   = {200000}
                    step         = {1000}
                    unit         = {currency[1]}
                    minMaxUnit   = {currency[1]}
                    isDarkMode   = {isDarkMode}
                    onChange     = {(name, value) => onChange(name, value, () => setPurchasePrice(value))}
                    comment      = {
                        <SelectInput
                            name     = {'Type of Ownership'}
                            title    = {''}
                            value    = {typeOfOwnership}
                            options  = {['Lease', 'Buy']}
                            comment  = {''}
                            onChange = {(name, value) => onChange(name, value, () => setTypeOfOwnership(value))}
                        />
                    }
                />
                <div className='selectorsWrapper'>
                    <SelectInput
                        name     = {'Years of Ownership'}
                        title    = {typeOfOwnership === 'Lease' ? 'Lease Term' : 'Years of Ownership'}
                        value    = {yearsOfOwnership}
                        options  = {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
                        comment  = {'years'}
                        onChange = {(name, value) => onChange(name, value, ()=>setYearsOfOwnership(value))}
                    />
                    <SelectInput
                        title    = {'Road Tax'}
                        value    = {roadTax}
                        options  = {[0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900]}
                        comment  = {currency[1] + ' per year'}
                        onChange = {(name, value) => onChange(name, value, () => setRoadTax(value))}
                    />
                </div>
                <RangeInput
                    title        = {'Instalment'}
                    defaultValue = {instalment}
                    rangeWidth   = {3000}
                    step         = {50}
                    unit         = {currency[1]}
                    minMaxUnit   = {currency[1]}
                    comment      = {'per month'}
                    isDisable    = {typeOfOwnership !== 'Lease'}
                    isDarkMode   = {isDarkMode}
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
                    isDarkMode   = {isDarkMode}
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
                    isDarkMode   = {isDarkMode}
                    onChange     = {(name, value) => onChange(name, value, () => setWarranty(value))}
                />
                <RangeInput
                    title        = {'Maintenance'}
                    defaultValue = {maintenance}
                    rangeWidth   = {5000}
                    step         = {100}
                    unit         = {currency[1]}
                    minMaxUnit   = {currency[1]}
                    comment      = {'per year'}
                    isDarkMode   = {isDarkMode}
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
                    isDarkMode   = {isDarkMode}
                    onChange     = {(name, value) => onChange(name, value, () => setMileage(value))}
                />
                <RangeInput
                    title        = {'Fuel Consumption'}
                    defaultValue = {fuelConsumption}
                    rangeWidth   = {fuelMeasurement[0] === 'MPG' ? 50 : 20}
                    step         = {1}
                    unit         = {fuelMeasurement[1]}
                    minMaxUnit   = {''}
                    comment      = {fuelMeasurement[0]}
                    isDarkMode   = {isDarkMode}
                    onChange     = {(name, value) => onChange(name, value, () => setFuelConsumption(value))}
                />
                <RangeInput 
                    title        = {'Service Average Cost'}
                    defaultValue = {serviceAverageCost}
                    rangeWidth   = {2000}
                    step         = {50}
                    unit         = {currency[1]}
                    minMaxUnit   = {currency[1]}
                    isDarkMode   = {isDarkMode}
                    onChange     = {(name, value) => onChange(name, value, () => setServiceAverageCost(value))}
                    comment      = {
                        <SelectInput
                            name     = {'Service Mileage'}
                            title    = {'per'}
                            value    = {serviceMileage}
                            options  = {[1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,20000]}
                            comment  = {distance[0].toLowerCase() + (distance[0] === 'Mile' ? 's' : '')}
                            onChange = {(name, value) => onChange(name, value, () => setServiceMileage(value))}
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
                    comment      = {'after ' + yearsOfOwnership + ' year' + (yearsOfOwnership > 1 ? 's' : '') + ' and '
                                 + utils.numberWithCommas((mileage * yearsOfOwnership)) + ' ' + distance[0].toLowerCase() + (distance[0] === 'Mile' ? 's' : '')}
                    isDarkMode   = {isDarkMode}
                    onChange     = {(name, value) => onChange(name, value, () => setAskingPrice(value))}
                />
            </div>
            <div className='calcButtonWrapper'>
                <input type='button' className='calcButton' onClick={() => {
                    onInfoVisible();
                    setTimeout(() => {
                        calcCosts();
                    }, 400)
                }}/>
            </div>
        </div>
    );

}