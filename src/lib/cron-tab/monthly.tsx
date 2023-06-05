import React, {FunctionComponent, useEffect, useState} from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

interface MonthlyCronProp {
    onChange(e?: string[]): void
    value: string[]
    translate(e: string): string
}
interface State {
    hour: number
    minute: number
    every: string
}
const MonthlyCron: FunctionComponent<MonthlyCronProp> = (props) => {
    const [state, setState] = useState<State>({hour:0, minute:0, every: ""})
   
    useEffect(() => {
        let every;
        if(props.value[3] === 'L'){
            every = "2";
        }else if(props.value[3] === 'LW') {
            every = "3";
        }else if(props.value[3].startsWith('L')) {
            every = "4";
        } else {
            every = "1";
        }
        setState({...state, every: every})
    }, [])
    const onDayChange = (e: {target: { value: string}}) => {
        if(((parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 31)) || e.target.value === "") {
            let val = ['0',props.value[1] === '*' ? '0' : props.value[1], props.value[2] === '*' ? '0': props.value[2],props.value[3],'1/1', '?','*'];
            val[3] = `${e.target.value}`;
            props.onChange(val)
        }
    }
    const onLastDayChange = (e: {target: { value: string}}) => {
        if(((parseInt(e.target.value) >> 0 && parseInt(e.target.value) <= 31)) || e.target.value === "") {
            let val = ['0',props.value[1] === '*' ? '0' : props.value[1], props.value[2] === '*' ? '0': props.value[2],props.value[3],'1/1', '?','*'];
            if(e.target.value === '') {
                    val[3] = ''
            } else {
                    val[3] = `L-${e.target.value}`;
            } 
            props.onChange(val)
        }
    }
    const onAtHourChange = (e: {target: { value: string}}) => {
        let val = props.value;
        val[2] = `${e.target.value}`;
        props.onChange(val)
    }
    const onAtMinuteChange = (e: {target: { value: string}}) => {
        let val = props.value;
        val[1] = `${e.target.value}`;
        props.onChange(val)
    }
    const translateFn = props.translate;
    return (<div className="tab-pane" id="monthly" >
                <div   className={`well well-small ${state.every==="1"?'active':''}`}>
                    <input type="radio" onChange={(e) => {setState({...state, every: e.target.value}); props.onChange(['0',props.value[1] === '*' ? '0' : props.value[1], props.value[2] === '*' ? '0': props.value[2],'1','1/1', '?','*'])}} value="1" name="MonthlyRadio" checked={state.every === "1" ? true : false} />
                    {translateFn('Day')}
                    <input readOnly={state.every !== "1"} type="number" value={props.value[3]} onChange={onDayChange}/>
                    {translateFn('of every month(s)')}
                </div>

                <div className={`well well-small ${state.every==="2"?'active':''}`}>
                    <input onChange={(e) => {setState({...state, every:e.target.value}); props.onChange(['0',props.value[1] === '*' ? '0' : props.value[1], props.value[2] === '*' ? '0': props.value[2],'L','*', '?','*'])}} type="radio" value="2" name="DailyRadio" checked={state.every === "2" ? true : false}/>
                    {translateFn('Last day of every month')}
                </div>
                <div className={`well well-small ${state.every==="3"?'active':''}`}>
                    <input onChange={(e) => {setState({...state, every:e.target.value}); props.onChange(['0',props.value[1] === '*' ? '0' : props.value[1], props.value[2] === '*' ? '0': props.value[2] ,'LW','*', '?','*'])}} type="radio" value="3" name="DailyRadio" checked={state.every === "3" ? true : false}/>
                    {translateFn('On the last weekday of every month')}
                </div>
                <div className={`well well-small ${state.every==="4"?'active':''}`}>
                    <input type="radio"  onChange={(e) => {setState({...state, every:e.target.value});  props.onChange(['0',props.value[1] === '*' ? '0' : props.value[1], props.value[2] === '*' ? '0': props.value[2],`L-${1}`,'*', '?','*']) }} value="4" name="MonthlyRadio" checked={state.every === "4" ? true : false} />
                    
                    <input readOnly={state.every !== "4"} type="number" value={props.value[3].split('-').length && props.value[3].split('-')[1] ? props.value[3].split('-')[1] : ''} onChange={onLastDayChange}/>
                    {translateFn('day(s) before the end of the month')}
                </div>
                {translateFn('Start time')} 
                <Hour onChange={onAtHourChange} value={props.value[2]} />
                <Minutes onChange={onAtMinuteChange} value={props.value[1]} />
            </div>)
}

export default MonthlyCron