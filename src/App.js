import { useState, useEffect } from 'react'
import Cookies   from 'universal-cookie';
import DV        from './DefaultValues'
import Header    from './components/Header/Header';
import Form      from './components/Form/Form';
import Info      from './components/Info/Info';
import Settings  from './components/Settings/Settings';
import CookieAck from './components/CookieAck/CookieAck';
import './stylesheets/App.css';


export default function App(){

    //setDefaultcookies:
    const setDefaultCookies = () => {
        //settings:
        cookies.set('Currency'             , [DV.CURRENCY.name,         DV.CURRENCY.symbol        ] , { path: '/' });
        cookies.set('Distance'             , [DV.DISTANCE.name,         DV.DISTANCE.symbol        ] , { path: '/' });
        cookies.set('Fuel Measurement'     , [DV.FUEL_MEASUREMENT.name, DV.FUEL_MEASUREMENT.symbol] , { path: '/' });
        cookies.set('Fuel Cost'            , DV.FUEL_COST                                           , { path: '/' });
        //form:
        cookies.set('Type of Ownership'    , DV.TYPE_OF_OWNERSHIP                                   , { path: '/' });
        cookies.set('Purchase Price'       , DV.PURCHASE_PRICE                                      , { path: '/' });
        cookies.set('Years of Ownership'   , DV.YEARS_OF_OWNERSHIP                                  , { path: '/' });
        cookies.set('Road Tax'             , DV.ROAD_TAX                                            , { path: '/' });
        cookies.set('Instalment'           , DV.INSTALMENT                                          , { path: '/' });
        cookies.set('Insurance'            , DV.INSURANCE                                           , { path: '/' });
        cookies.set('Warranty'             , DV.WARRANTY                                            , { path: '/' });
        cookies.set('Maintenance'          , DV.MAINTENANCE                                         , { path: '/' });
        cookies.set('Mileage'              , DV.MILEAGE                                             , { path: '/' });
        cookies.set('Fuel Consubtion'      , DV.FUEL_CONSUBTION                                     , { path: '/' });
        cookies.set('Service Average Cost' , DV.SERVICE_AVERAGE_COST                                , { path: '/' });
        cookies.set('Service Mileage'      , DV.SERVICE_MILEAGE                                     , { path: '/' });
        cookies.set('Asking Price'         , DV.ASKING_PRICE                                        , { path: '/' });
    }

    //isTouchScreenDevice:
    const isTouchScreenDevice = () => {
		try{
			document.createEvent('TouchEvent');
			return true;
		}catch(e){
			return false;
		}
	}

    //updateSettings:
    const updateSettings = (title, value) => {
        switch(title){
            case 'Currency':
                setCurrency(value);
                break;
            case 'Distance':
                setDistance(value);
                break;
            case 'Fuel Measurement':
                setFuelMeasurement(value);
                break;
            case 'Fuel Cost':
                setFuelCost(value);
                break;
        }
    }
    
    //states:
    const cookies = new Cookies();
    const [isCookieAckVisible , setCookieAckVisibility ] = useState(false                                                   );
    const [isSettingsVisible  , setSettingsVisibility  ] = useState(false                                                   );
    const [currency           , setCurrency            ] = useState(cookies.get('Currency'         ) || [DV.CURRENCY.name, DV.CURRENCY.symbol]);
    const [distance           , setDistance            ] = useState(cookies.get('Distance'         ) || [DV.DISTANCE.name, DV.DISTANCE.symbol]);
    const [fuelMeasurement    , setFuelMeasurement     ] = useState(cookies.get('Fuel Measurement' ) || [DV.FUEL_MEASUREMENT.name, DV.FUEL_MEASUREMENT.symbol]);
    const [fuelCost           , setFuelCost            ] = useState(cookies.get('Fuel Cost'        ) || DV.FUEL_COST        );
    const [data               , setData                ] = useState(null);

    //state listenner:
    useEffect(() => {
        if(cookies.get('Purchase Price') === undefined)
            setTimeout(() => {
                setCookieAckVisibility(true);
            }, 2000);
    }, [isCookieAckVisible]);

    //render:
    return (
        <div className={'App' + (isTouchScreenDevice() ? '' : ' notTouchScreen')}>
            <div className='window'>
                <div className='main'>
                    <div className='headerWrapper'>
                        <Header onMenuClick = {()=>setSettingsVisibility(true)}/>
                    </div>
                    <div className='formWrapper'>
                        <div className='formContainer'>
                            <Form
                                currency        = {currency}
                                distance        = {distance}
                                fuelMeasurement = {fuelMeasurement}
                                fuelCost        = {fuelCost}
                                onCalculate     = {(data)=>setData(data)}
                            />
                        </div>
                    </div>
                </div>
                <div className='infoWrapper'>
                    <div className='infoContainer'>
                        <Info
                            currency        = {currency}
                            distance        = {distance}
                            data            = {data}
                        />
                    </div>
                </div>
            </div>
            <Settings
                isVisible       = {isSettingsVisible}
                currency        = {currency}
                distance        = {distance}
                fuelMeasurement = {fuelMeasurement}
                fuelCost        = {fuelCost}
                onUpdate        = {updateSettings}
                onClose         = {()=>setSettingsVisibility(false)}
            />
            <CookieAck
                isVisible   = {isCookieAckVisible}
                massage     = {'This website uses cookies!'}
                description = {'We use cookies in order to personalize your site experience.'}
                acceptText  = {'Got it, Allow!'}
                onAccept    = {() => {
                    setDefaultCookies();
                    setCookieAckVisibility(false);
                    setTimeout(() => {
                        setSettingsVisibility(true);
                    }, 1000);
                }}
            />
        </div>
    );

}