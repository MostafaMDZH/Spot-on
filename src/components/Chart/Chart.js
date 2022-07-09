import { useEffect, useState } from "react"
import "./Chart.css";

export default function Chart({
    currency,
    data
}){

    //barMaxHeight:
    let barMaxHeight = 195 // total height
                     - 23  // columns name
                     - 5;  // bar padding

    //numberWithCommas:
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

    //calcBarCiel:
    const calcBarCiel = (maxValue) => {
        let numMult = maxValue;
        let k = 0;
        while(numMult > 100){
            numMult = numMult / 10;
            k++;
        }
        numMult = (Math.ceil((numMult + 5) / 10) * 10) - 5;
        let barFirstFloorMul = Math.ceil(numMult / 3);
        let barCiel = barFirstFloorMul * 3 * Math.pow(10, k);
        return barCiel;
    }

    //addSign:
    const addSign = (number) => {
        if(number > 1000000)
            return (number / 1000000) + 'M';
        if(number > 1000)
            return (number / 1000   ) + 'K';
        return number;
    }

    //createColumns:
    const createColumns = (data, maxValue, barCiel) => {
        let columns = [];
        let isT;
        Object.keys(data).map((key) => {
            let val = data[key].value;
            if(val === maxValue && val > 0) isT = true;
            else isT = false;
            let hei = (val / barCiel) * barMaxHeight;
            hei = Math.round(hei);
            columns.push({...data[key], height: hei, isTallest: isT});
        });
        return columns;
    }
    
    //states:
    let maxValue = getMaxValue(data);
    let barCiel  = calcBarCiel(maxValue);
    let [barThirdFloor  , setBarThirdFloor ] = useState(addSign( barCiel                     ));
    let [barSecondFloor , setBarSecondFloor] = useState(addSign((barCiel / 3) * 2            ));
    let [barFirstFloor  , setBarFirstFloor ] = useState(addSign( barCiel / 3                 ));
    let [columns        , setColumns       ] = useState(createColumns(data, maxValue, barCiel));

    //state change:
    useEffect(()=>{
        let maxValue = getMaxValue(data);
        let barCiel  = calcBarCiel(maxValue);
        setBarThirdFloor(addSign(  barCiel              ));
        setBarSecondFloor(addSign((barCiel / 3) * 2     ));
        setBarFirstFloor(addSign(  barCiel / 3          ));
        setColumns(createColumns(data, maxValue, barCiel));
    },[data]);

    //return:
    return (
        <div className="Chart">
            <div className="verticalColum">
                <a>{barThirdFloor }</a>
                <a>{barSecondFloor}</a>
                <a>{barFirstFloor }</a>
                <a>0</a>
            </div>
            <div className="columsWrapper">{
                Object.keys(columns).map((key) => {
                    return (
                        <div className="barWrapper" key={key}>
                            <a><span
                                className={columns[key].isTallest ? "tallest" : ""}
                                style={{height: (columns[key].height + 'px')}}
                                title={currency[1] + numberWithCommas(columns[key].value) + " per year"}
                            ></span></a>
                            <a title={columns[key].title}>{columns[key].name}</a>
                        </div>
                    );
                })
            }</div>
        </div>
    )

}