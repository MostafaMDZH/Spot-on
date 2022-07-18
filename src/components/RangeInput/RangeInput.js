import { useEffect, useState } from 'react'
import './RangeInput.css';

export default function RangeInput({
        name,
        title,
        defaultValue,
        rangeWidth,
        step,
        unit,
        minMaxUnit,
        comment,
        customClasses,
        isDisable,
        isDarkMode,
        onChange
    }){

    //checking name:
    if(name === undefined)
        name = title;
    
    //calcMin:
    const calcMin = (value, rngWidth) => {
        let rangeRadius = rngWidth / 2;
        let min = value - rangeRadius;
        //rounding the min:
        min = min / rangeRadius;
        min = Math.round(min, 0);
        min = min * rangeRadius;
        if(min > 0)
            return min;
        return 0;
    }

    //calcMax:
    const calcMax = (min, rangeWidth) => {
        return min + rangeWidth;
    }

    //calcPercentage:
    const calcPercentage = (value, min, max) => {
        return (value-min)/(max-min)*100;
    }

    //numberWithCommas:
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    //onTextInputChange:
    const onTextInputChange = (val) => {
        if(val === '0.'){
            setValue(val);
            return;
        }
        val = val.replace(/,/g, '');
        // val = val.replace(/^0+/, '');
        if(val === '') val = '0';
        if(!isNaN(val)){
            let valInt = parseInt(val, 10);
            let newMin = min;
            let newMax = max;
            if(valInt < min || valInt > max){
                newMin = calcMin(val, rangeWidth);
                newMax = calcMax(newMin, rangeWidth);
            }
            setValue(val);
            setMin(newMin);
            setMax(newMax);
            setPercentage(calcPercentage(val, newMin, newMax));
            onChange(name, val);
        }
    }

    //onRangeInputChange:
    const onRangeInputChange = (val) => {
        val = val.replace(/,/g, '');
        if(!isNaN(val)){
            setValue(val);
            setPercentage(calcPercentage(val, min, max));
            onChange(name, val);
        }
    }

    //onRangeWidthUpdate:
    const onRangeWidthUpdate = () => {
        let newMin = calcMin(value, rangeWidth);
        let newMax = calcMax(newMin, rangeWidth);
        setMin(newMin);
        setMax(newMax);
        setPercentage(calcPercentage(value, newMin, newMax));
    }

    //state:
    const [value     , setValue     ] = useState(defaultValue);
    const [min       , setMin       ] = useState(calcMin(defaultValue, rangeWidth));
    const [max       , setMax       ] = useState(calcMax(min, rangeWidth));
    const [percentage, setPercentage] = useState(calcPercentage(defaultValue, min, max));

    //parameter change:
    useEffect(()=>{
        onRangeWidthUpdate();
    },[rangeWidth]);

    //return:
    return (
        <div className={"RangeInput " + (isDisable ? 'disable ': '') + (customClasses || "")}>
            <div className='content'>
                <a className="title">{title}</a>
                <div className="valueWrapper">
                    <a className="unit">{unit}</a>
                    <input type="text" className="textInput" value={numberWithCommas(value)} placeholder="0"
                        onChange={(e) => onTextInputChange(e.target.value)}//todo: also change with keyUp & keyDown
                        />
                    <div className="comment">{comment}</div>
                </div>
                <input type="range" className="rangeInput" value={value} min={min} max={max} step={step}
                    onChange={(e) => onRangeInputChange(e.target.value)}
                    style={{
                        background: 'linear-gradient(to right, ' +
                        (isDarkMode === 'Yes' ? '#ddd' : '#039') + ' 0%, ' +
                        (isDarkMode === 'Yes' ? '#ddd' : '#039') + ' ' +
                        percentage + '%, #ddd ' + percentage + '%, #ddd 100%)'
                    }}
                    />
                <div className="rangeInfoWrapper">
                    <a>{minMaxUnit + numberWithCommas(min)}</a>
                    <a>{minMaxUnit + numberWithCommas(max)}</a>
                </div>
            </div>
        </div>
    )

}