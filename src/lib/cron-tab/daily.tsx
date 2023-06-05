import React, {FunctionComponent, useEffect, useState} from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

interface DailyCronProp {
    onChange(e?: string[]): void
    value: string[]
    translate(e: string): string
}
interface State {
    hour: number
    minute: number
    every: boolean
}
const DailyCron: FunctionComponent<DailyCronProp> = (props) => {
    const [state, setState] = useState<State>({hour:0, minute:0, every: false})

    useEffect(()=>{
        setState({...state, every: props.value[3] !== '?'});
    }, [])

    const onDayChange = (e: {target: { value: string}}) => {
        if(!e.target.value || (parseInt(e.target.value) > 0 && parseInt(e.target.value) < 32 )) {
            // props.value = ['0', getValueByIndex(1), getValueByIndex(1),'*','*','?','*'];
            onValueChange(3, (e.target.value ? `1/${e.target.value}` : e.target.value));
        }
    }

    /**
     * If value is * return 0 else return value
     * @param {position in array} index 
     */
     const getValueByIndex = (index: number) => {
        return props.value[index] === '*' ? '0' : props.value[index];
    }

    const onAtHourChange = (e: {target: { value: string}}) => {
        onValueChange(2, e.target.value);
    }

    const onAtMinuteChange = (e: {target: { value: string}}) =>  {
        onValueChange(1, e.target.value);
    }

    const onValueChange = (cronPosition: number, value: string) => {
        let val = props.value;
        val[cronPosition] = value;
        props.onChange(val);
    }

    const translateFn = props.translate;
    console.log('state',state)
    return (
        <div className="tab-pane" id="daily">
             <div className={`well well-small ${!state.every?'active':''}`}>
                <input onChange={(e) => {setState({ ...state, every:false }); props.onChange(['0', props.value[1], props.value[2],'?','*', 'MON-FRI','*'])}} type="radio" value="2" name="DailyRadio" checked={!state.every}/>
                <span>{translateFn('Every week day')}</span>
            </div>
            <div className={`well well-small ${state.every?'active':''}`}>
                <input type="radio" onChange={(e) => {setState({ ...state, every:true }); props.onChange();}} value="1" name="DailyRadio" checked={state.every} />
                <span>{translateFn('Every')}</span>
                <input disabled={!state.every} type="Number" maxLength={2} onChange={onDayChange} value={props.value[3].split('/')[1] ? props.value[3].split('/')[1] :''} />
                <span>{translateFn('day(s)')}</span>
            </div>
           
            <span>{translateFn('Start time')}</span>
            <Hour onChange={onAtHourChange} value={props.value[2]} />
            <Minutes onChange={onAtMinuteChange} value={props.value[1]} />
        </div>)
}
export default DailyCron;