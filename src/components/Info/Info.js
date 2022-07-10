import Chart from '../Chart/Chart';
import './Info.css';

export default function Info({
    currency,
    distance,
    data
}){

    //numberWithCommas:
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    //getPerDistance:
    const getPerDistance = () => {
        return numberWithCommas(Number(data.perDistance < 0 ? -data.perDistance : data.perDistance).toFixed(2))
    }

    //getPerTime:
    const getPerTime = (value) => {
        return numberWithCommas(value < 0 ? -value : value);
    }

    //setDefaultData:
    const getDefaultData = () => {
        return {
            perDistance: '0.00',
            daily:       '00.0',
            monthly:     '00',
            yearly:      '00',
            chart: [
                { name: 'Dep', title: 'Depreciation'           , value: 0 },
                { name: 'T&I', title: 'Tax & Insurance'        , value: 0 },
                { name: 'W&M', title: 'Warranty & Maintenance' , value: 0 },
                { name: 'Ser', title: 'Servce'                 , value: 0 },
                { name: 'Fue', title: 'Fuel'                   , value: 0 },
            ]
        }
    }

    //startup:
    if(data === null)
        data = getDefaultData();
    
    //render:
    return (
        <div className='Info'>
            <div className='costs'>
                <h5 className='title'>Your <a
                    className={data.perDistance >= 0 ? '' : 'benefits'}
                    >{data.perDistance >= 0 ? 'costs' : 'benefits'}</a> will be</h5>
                <div className='distanceWrapper'>
                    <a className='unit'>{currency[1]}</a>
                    <a className='ammount' title={getPerDistance()}>{getPerDistance()}</a>
                    <a className='period'>per {distance[0].toLowerCase()}</a>
                </div>
                <div className='timeWrapper'>
                    <div className='timeCostWrapper'>
                        <a className='period'>daily</a>
                        <div className='ammountWrapper'>
                            <a className='currency'>{currency[1]}</a>
                            <a className='ammount' title={getPerTime(data.daily)}>{getPerTime(data.daily)}
                            </a>
                        </div>
                    </div>
                    <div className='timeCostWrapper'>
                        <a className='period'>monthly</a>
                        <div className='ammountWrapper'>
                            <a className='currency'>{currency[1]}</a>
                            <a className='ammount' title={getPerTime(data.monthly)}>{getPerTime(data.monthly)}</a>
                        </div>
                    </div>
                    <div className='timeCostWrapper'>
                        <a className='period'>yearly</a>
                        <div className='ammountWrapper'>
                            <a className='currency'>{currency[1]}</a>
                            <a className='ammount' title={getPerTime(data.yearly)}>{getPerTime(data.yearly)}</a>
                        </div>
                    </div>
                </div>
            </div>
            <Chart currency = {currency} data = {data.chart}/>
        </div>
    )

}