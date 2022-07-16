import { useEffect, useState } from 'react'
import './Chart.css';

export default function Chart({
    currency,
    data
}){

    //barMaxHeight:
    let barMaxHeight = 200 //total height
                     - 25  //column name
                     - 5;  //bar padding

    //numberWithCommas:
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    //getMaxValue:
    const getMaxValue = (data) => {
        let maxValue = 0;
        Object.keys(data).map((key) => {
            let val = data[key].value;
            if(val > maxValue)
                maxValue = val;
        });
        return maxValue;
    }

    //calcBarCeil:
    const calcBarCeil = (maxValue) => {
        let numMlt = maxValue;
        let k = 0;
        while(numMlt > 100){
            numMlt = numMlt / 10;
            k++;
        }
        numMlt = (Math.ceil((numMlt + 10) / 10) * 10) - 10;
        let barFirstFloorMul = Math.ceil(numMlt);
        let barCeil = barFirstFloorMul * Math.pow(10, k);
        return barCeil;
    }

    //addSign:
    const addSign = (number) => {
        if(number >= 1000000)
            number = (number / 1000000) + 'M';
        if(number >= 1000)
            number = (number / 1000   ) + 'K';
        if(number.length > 4)
            return number.substring(0, 2) + number.substring(4);
        return number;
    }

    //createLabel:
    const createLabel = (number, floor) => {
        switch(floor){
            case 3:
                return addSign(number);
            case 2:
                return addSign(Math.ceil(((barCeil / 3) * 2) / 100) * 100);
            case 1:
                return addSign(Math.ceil(((barCeil / 3) * 1) / 100) * 100);
        }
    }

    //createColumns:
    const createColumns = (data, maxValue, barCeil) => {
        let columns = [];
        let isT;
        Object.keys(data).map((key) => {
            let val = data[key].value;
            if(val === maxValue && val > 0) isT = true;
            else isT = false;
            let hei = (val / barCeil) * barMaxHeight;
            hei = Math.round(hei);
            if(hei < 0) hei = 0;
            columns.push({...data[key], height: hei, isTallest: isT});
        });
        return columns;
    }
    
    //states:
    let maxValue = getMaxValue(data);
    let barCeil  = calcBarCeil(maxValue);
    let [bar3thFloor , setBar3thFloor ] = useState(createLabel(barCeil, 3));
    let [bar2thFloor , setBar2thFloor ] = useState(createLabel(barCeil, 2));
    let [bar1stFloor , setBar1stFloor ] = useState(createLabel(barCeil, 1));
    let [columns     , setColumns     ] = useState(createColumns(data, maxValue, barCeil));

    //state change:
    useEffect(() => {
        let maxValue = getMaxValue(data);
        let barCeil  = calcBarCeil(maxValue);
        setBar3thFloor(createLabel(barCeil, 3));
        setBar2thFloor(createLabel(barCeil, 2));
        setBar1stFloor(createLabel(barCeil, 1));
        setColumns(createColumns(data, maxValue, barCeil));
    },[data]);

    //return:
    return (
        <div className='Chart'>
            <div className='verticalColum'>
                <a title={bar3thFloor}>{bar3thFloor}</a>
                <a title={bar2thFloor}>{bar2thFloor}</a>
                <a title={bar1stFloor}>{bar1stFloor}</a>
                <a>0</a>
            </div>
            <div className='columnsWrapper'>{
                Object.keys(columns).map((key) => {
                    return (
                        <div className='barWrapper' key={key}>
                            <a><span
                                className={columns[key].isTallest ? 'tallest' : ''}
                                style={{height: (columns[key].height + 'px')}}
                                title={currency[1] + numberWithCommas(columns[key].value) + ' per year'}
                            ></span></a>
                            <a title={columns[key].title}>{columns[key].name}</a>
                        </div>
                    );
                })
            }</div>
        </div>
    )

}