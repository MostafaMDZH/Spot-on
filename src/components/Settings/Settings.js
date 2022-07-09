import Cookies     from 'universal-cookie';
import SelectInput from "../SelectInput/SelectInput";
import RangeInput  from "../RangeInput/RangeInput";
import "./Settings.css";

export default function Settings({
        isVisible,
        currency,
        distance,
        fuelMeasurement,
        fuelCost,
        onUpdate,
        onClose
    }){

    //handle change:
    const handleChange = (title, value) => {
        const cookies = new Cookies();
        cookies.set(title, value, { path: '/' });
        onUpdate(title, value);
    }

    //return:
    return (
        <div className="Settings" onClick={onClose} style={{display: (isVisible === true ? "block": "none")}}>
            <div className="window" onClick={(e)=>e.stopPropagation()}>
                <div className="header">
                    <a>Settings</a>
                    <input type="button" onClick={onClose}/>
                </div>
                <div className="section">
                    <a className="name">Units</a>
                    <SelectInput
                        title         = {'Currency'}
                        value         = {currency.join(',')}
                        options       = {[
                            [['Euro' , '€'], 'Euro' ],
                            [['Pound', '£'], 'Pound'],
                            [['USD'  , '$'], 'USD'  ]
                        ]}
                        comment       = {''}
                        customClasses = {'settings'}
                        onChange      = {handleChange}
                    />
                    <SelectInput
                        title         = {'Distance'}
                        value         = {distance.join(',')}
                        options       = {[
                            [['Km'  , 'Km' ], 'Km'  ],
                            [['Mile', 'ml.'], 'Mile']
                        ]}
                        comment       = {''}
                        customClasses = {'settings'}
                        onChange      = {handleChange}
                    />
                    <SelectInput
                        name          = {'Fuel Measurement'}
                        title         = {'Fuel Consubtion'}
                        value         = {fuelMeasurement.join(',')}
                        options       = {[
                            [['L/100Km', 'L'], 'L/100Km'],
                            [['MPG'    , 'G'], 'MPG'    ]
                        ]}
                        comment       = {''}
                        customClasses = {'settings'}
                        onChange      = {handleChange}
                    />
                </div>
                <div className="section" id="prices">
                    <a className="name">Prices</a>
                    <RangeInput
                        title         = {'Fuel Cost'}
                        defaultValue  = {fuelCost}
                        rangeWidth    = {10}
                        step          = {1}
                        unit          = {currency[1]}
                        minMaxUnit    = {currency[1]}
                        comment       = {'per ' + fuelMeasurement[1]}
                        customClasses = {'settings'}
                        onChange      = {handleChange}
                    />
                </div>
                <input type="button" className="saveButton" value="Save" onClick={onClose}/>
            </div>
        </div>
    )

}