import Cookies     from 'universal-cookie';
import RangeInput  from '../RangeInput/RangeInput';
import SelectInput from '../SelectInput/SelectInput';
import './CookieAck.css';

export default function CookieAck({
        isVisible,
        massage,
        description,
        acceptText,
        onAccept
    }){

    //return:
    return (
        <div className={'CookieAck' + (isVisible  === true  ? ' visible'    : '')} onClick={(e)=>e.stopPropagation()}>
            <div className='window'>
                <div className='container'>
                    <div className='imageWrapper'>
                        <span className='image'></span>
                    </div>
                    <div className='bottomArea'>
                        <div className='textsWrapper'>
                            <h2 className='massage'    >{massage    }</h2>
                            <p  className='description'>{description}</p>
                        </div>
                        <div className='buttonWrapper'>
                            <input type='button' className='acceptButton' value={acceptText} onClick={onAccept}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}