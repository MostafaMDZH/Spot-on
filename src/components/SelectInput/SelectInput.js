import './SelectInput.css';

export default function SelectInput({
        name,
        title,
        value,
        options,
        comment,
        customClasses,
        isDisable,
        onChange
    }){

    //checking name:
    if(name === undefined)
        name = title;

    //onChage:
    const onSelect = (val) => {
        if(val.indexOf(',') >= 0)
            val = val.split(',');
        onChange(name, val);
    }

    //return:
    return (
        <div className={'SelectInput ' + (isDisable ? 'disable ': '') + (customClasses || '')}>
            <a className='title'>{title}</a>
            <div>
                <div className='selectWrapper'>
                    <select className='select' defaultValue={value} onChange={(e) => onSelect(e.target.value)}>{
                        Object.keys(options).map((key) => {
                            return (
                                <option key={key}
                                    value={(typeof options[key] === 'string' ? options[key] : (options[key][0] || options[key]))}>
                                    {(typeof options[key] === 'string' ? options[key] : (options[key][1] || options[key]))}
                                </option>
                            );
                        })
                    }</select>
                </div>
                <a className='comment'>{comment}</a>
            </div>
        </div>
    )

}