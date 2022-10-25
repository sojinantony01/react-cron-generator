import React, {FunctionComponent} from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

interface WeeklyCronProp {
    onChange(e?: string[]): void
    value: string[]
    translate(e: string): string
}

const WeeklyCron: FunctionComponent<WeeklyCronProp> = (props) => {
    
    const onAtHourChange = (e: {target: { value: string}}) => {
        let val = props.value;
        val[0] = '0';
        val[2] = `${e.target.value}`;
        props.onChange(val);
    }

    const onAtMinuteChange = (e: {target: { value: string}}) => {
        let val = props.value;
        val[0] = '0';
        val[1] = `${e.target.value}`;
        props.onChange(val);
    }

    const onCheck = (e: {target: { checked: boolean, value: string}}) => {
        let val = props.value;
        val[0] = '0';
        if(e.target.checked) {
            onDayChecked(val, e);
        } else {
            onDayUnChecked(val, e);           
        }
        props.onChange(val)
    }

    const onDayChecked = (val: string[], e: {target: { checked: boolean, value: string}}) => {
        val[2] = (`${val[2]}`.split('/').length > 1) ? '0' : val[2].toString();
        val[3] = '?';
        val[4] = '*';
        if (val[5] === '*' || val[5] === '?' || val[5] === 'MON-FRI') {
            val[5] = e.target.value;
        } else {
            val[5] = val[5] + '!' + e.target.value;
        }
    }

    const onDayUnChecked = (val: string[], e: {target: { checked: boolean, value: string}}) =>  {
        let valFive:string | string[] = val[5].split('!');
        if (valFive.length > 1) {
            valFive.splice(valFive.indexOf(e.target.value), 1);
            valFive = valFive.toString().replace(/,/g, '!');
        }
        else {
            valFive = '*';
        }
        val[5] = valFive
    }

    const translateFn = props.translate;
    return (<div className="container-fluid">
        <div className="well well-small row">
            <div className="span6 col-sm-6">
                <div className="text_align_left">
                    <input className='min_height_auto' type="checkbox" value="MON" onChange={onCheck} checked={(props.value[5].search('MON') !== -1 ) ? true : false} />{translateFn('Monday')}<br/>
                    <input className='min_height_auto' type="checkbox" value="WED" onChange={onCheck} checked={props.value[5].search('WED') !== -1 ? true : false}  />{translateFn('Wednesday')}<br/>
                    <input className='min_height_auto' type="checkbox" value="FRI" onChange={onCheck} checked={(props.value[5].search('FRI') !== -1 ) ? true : false}/>{translateFn('Friday')}<br/>
                    <input className='min_height_auto' type="checkbox" value="SUN" onChange={onCheck} checked={props.value[5].search('SUN') !== -1 ? true : false}/>{translateFn('Sunday')}
                </div>
            </div>
            <div className="span6 col-sm-6">
                <div className="text_align_left">
                    <input className='min_height_auto' type="checkbox" value="TUE" onChange={onCheck} checked={props.value[5].search('TUE') !== -1 ? true : false}/>{translateFn('Tuesday')}<br />
                    <input className='min_height_auto' type="checkbox" value="THU" onChange={onCheck} checked={props.value[5].search('THU') !== -1 ? true : false}/>{translateFn('Thursday')}<br />
                    <input className='min_height_auto' type="checkbox" value="SAT" onChange={onCheck} checked={props.value[5].search('SAT') !== -1 ? true : false}/>{translateFn('Saturday')}
                </div><br /><br />
            </div>
        </div>
        {translateFn('Start time')}
        <Hour onChange={onAtHourChange} value={props.value[2]} />
        <Minutes onChange={onAtMinuteChange} value={props.value[1]} />
    </div>)
}

export default WeeklyCron;