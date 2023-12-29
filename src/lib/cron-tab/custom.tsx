import React from 'react';

interface CustomCronProp {
    onChange(e: string[]): void
    value: string[]
    translate(e: string): string
    isDisabled?: boolean
}

const CustomCron: React.FunctionComponent<CustomCronProp> = (props) => {
    const onChange = (e: {target: { value: string}}) => {
        if(props.isDisabled===true) return;
        props.onChange(e.target.value.replace(/,/g, '!').split(" "));
    }
    const translateFn = props.translate;

    let val = props.value.toString().replace(/,/g,' ').replace(/!/g, ',');

    return (<div className="well">   
            {translateFn('Expression')} <input type="text" onChange={onChange} value={val} disabled={props.isDisabled}/>
    </div>)
    
}
export default CustomCron