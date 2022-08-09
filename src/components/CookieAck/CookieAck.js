import './CookieAck.scss';

export default function CookieAck({
        isVisible,
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
                            <h2 className='massage'>This website uses cookies!</h2>
                            <p  className='description'>We use cookies in order to personalize your site experience.</p>
                        </div>
                        <div className='buttonWrapper'>
                            <input type='button' className='acceptButton' value='Got it, Allow!' onClick={onAccept}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}