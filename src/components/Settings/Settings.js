import { toast, Toaster } from 'react-hot-toast';
import Cookies            from 'universal-cookie';
import RangeInput         from '../RangeInput/RangeInput';
import SelectInput        from '../SelectInput/SelectInput';
import './Settings.css';

export default function Settings({
        isVisible,
        currency,
        distance,
        fuelMeasurement,
        fuelCost,
        isDarkMode,
        onUpdate,
        onClose
    }){

    //handleChange:
    const handleChange = (title, value) => {
        const cookies = new Cookies();
        cookies.set(title, value, { path: '/', maxAge: 1000*24*60*60 });
        onUpdate(title, value);
    }

    //getToastStyle:
    const getToastStyle = (emoji) => {
        return isDarkMode === 'Yes' ? {
            icon: emoji,
            style: {
                fontSize:     '1.4rem',
                borderRadius: '6px',
                background:   '#012',
                color:        '#fff'
            }
        } : {
            icon: emoji,
            style: {
                fontSize:     '1.4rem',
                borderRadius: '6px',
                background:   '#fff',
                color:        '#333'
            }
        }
    }

    //copyTextToClipboard:
	const copyTextToClipboard = (text) => {
		if(!navigator.clipboard){
			fallbackCopyTextToClipboard(text);
		}else{
            console.log('navigator.clipboard');
			navigator.clipboard.writeText(text).then(function(){
                toast('Email copied', getToastStyle('👍'));
			},function(err){
				toast('Cannot copy', getToastStyle('👎'));
			});
		}
	}

	//fallbackCopyTextToClipboard:
	const fallbackCopyTextToClipboard = (text) => {
		let textArea = document.createElement("textarea");
		textArea.value			= text;
		textArea.style.top		= "0";//avoid scrolling to bottom:
		textArea.style.left		= "0";
		textArea.style.position	= "fixed";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try{
			document.execCommand('copy');
            toast('Email copied', getToastStyle('👍'));
		}catch(err){
            toast('Cannot copy', getToastStyle('👎'));
		}
		document.body.removeChild(textArea);
	}

    //return:
    return (
        <div className={'Settings' + (isVisible === true ? ' visible': '')} onClick={onClose}>
            <Toaster/>
            <div className='window' onClick={(e)=>e.stopPropagation()}>
                <input type='button' className='closeButton' onClick={onClose}/>
                <div className='containersWrapper'>
                    <div className='container settings'>
                        <a className='title'>Settings</a>
                        <div className='section'>
                            <a className='name'>Units</a>
                            <SelectInput
                                title    = {'Currency'}
                                value    = {currency.join(',')}
                                options  = {[
                                    [['Euro' , '€'], 'Euro' ],
                                    [['Pound', '£'], 'Pound'],
                                    [['USD'  , '$'], 'USD'  ]
                                ]}
                                comment  = {''}
                                onChange = {handleChange}
                            />
                            <SelectInput
                                title    = {'Distance'}
                                value    = {distance.join(',')}
                                options  = {[
                                    [['Km'  , 'Km' ], 'Km'  ],
                                    [['Mile', 'ml.'], 'Mile']
                                ]}
                                comment  = {''}
                                onChange = {handleChange}
                            />
                            <SelectInput
                                name     = {'Fuel Measurement'}
                                title    = {'Fuel Consumption'}
                                value    = {fuelMeasurement.join(',')}
                                options  = {[
                                    [['L/100Km', 'L'], 'L/100Km'],
                                    [['MPG'    , 'G'], 'MPG'    ]
                                ]}
                                comment  = {''}
                                onChange = {handleChange}
                            />
                        </div>
                        <div className='section' id='prices'>
                            <a className='name'>Prices</a>
                            <RangeInput
                                title        = {'Fuel Cost'}
                                defaultValue = {fuelCost}
                                rangeWidth   = {10}
                                step         = {1}
                                unit         = {currency[1]}
                                minMaxUnit   = {currency[1]}
                                comment      = {'per ' + fuelMeasurement[1]}
                                onChange     = {handleChange}
                            />
                        </div>
                    </div>
                    <div className='container about'>
                        <a className='title'>About</a>
                        <div className='section'>
                            <h2 className='madeBy'>Made with ❤️ by <a className='link' href='https://github.com/MostafaMDZH'>Mostafa Mohammadzadeh</a></h2>
                            <p className='version'>Version 1.0.0</p>
                        </div>
                        <div className='section'>
                            <a className='name'>Contact</a>
                            <input type='button'
                                className='email'
                                value='mostafa.mdzh@gmail.com'
                                onClick={()=>copyTextToClipboard('mostafa.mdzh@gmail.com')}
                            />
                        </div>
                        <div className='section'>
                            <a className='name'>Copyright</a>
                            <p>Released under the <a className='link' href='https://en.wikipedia.org/wiki/MIT_License'>MIT License</a></p>
                            <p>Checkout the source code on <a className='link' href='https://github.com/MostafaMDZH/Depreciation-Calculator'>Github</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}