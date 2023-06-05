import React from 'react';

interface CustomCronProp {
    onChange(e: string[]): void
    value: string[]
    translate(e: string): string
}

const CustomCron: React.FunctionComponent<CustomCronProp> = (props) => {
    const onChange = (e: { target: { value: string } }) => {
        props.onChange(e.target.value.replace(/,/g, '!').split(" "));
    }
    const translateFn = props.translate;

    let val = props.value.toString().replace(/,/g, ' ').replace(/!/g, ',');
console.log('props',props.value)
    return (<div id="custom-cron" className="well">
        {translateFn('Expression')} <input id="custom-cron-input" placeholder='Enter Expression' type="text" onChange={onChange} value={val} />
    </div>)

}
export default CustomCron 