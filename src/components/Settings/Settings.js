import Cookies     from 'universal-cookie';
import RangeInput  from '../RangeInput/RangeInput';
import SelectInput from '../SelectInput/SelectInput';
import './Settings.css';

export default function Settings({
        isVisible,
        currency,
        distance,
        fuelMeasurement,
        fuelCost,
        onUpdate,
        onClose
    }){

    //handleChange:
    const handleChange = (title, value) => {
        const cookies = new Cookies();
        cookies.set(title, value, { path: '/' });
        onUpdate(title, value);
    }

    //return:
    return (
        <div className={'Settings' + (isVisible === true ? ' visible': '')} onClick={onClose}>
            <div className='window' onClick={(e)=>e.stopPropagation()}>
                <input type='button' className='closeButton' onClick={onClose}/>
                <div className='containerWrapper'>
                    <div className='container settings'>
                        <a className='title'>Settings</a>
                        <div className='section'>
                            <a className='name'>Units</a>
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
                                title         = {'Fuel Consumption'}
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
                        <div className='section' id='prices'>
                            <a className='name'>Prices</a>
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
                    </div>
                    <div className='container about'>
                        <a className='title'>About</a>
                        <h2 className='madeBy'>Made with ❤️ by <a className='link' href='https://github.com/MostafaMDZH'>Mostafa Mohammadzadeh</a></h2>
                        <p className='version'>Version 1.0.0</p>
                        <a className='sectionTitle'>Contact</a>
                        <p className='email'><a className='link' href = "mailto: mostafa.mdzh@gmail.com">mostafa.mdzh@gmail.com</a></p>
                        <a className='sectionTitle'>Copy Left :)</a>
                        <p>Released under the <a className='link' href='https://en.wikipedia.org/wiki/MIT_License'>MIT License</a></p>
                        <p>View the source on <a className='link' href='https://github.com/MostafaMDZH/Depreciation-Calculator'>Github</a></p>
                    </div>
                </div>
            </div>
        </div>
    )

}