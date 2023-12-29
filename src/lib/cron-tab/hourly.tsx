import React, {FunctionComponent, useEffect, useState} from 'react';
import Minutes from '../minutes-select';
import Hour from '../hour-select';

interface HourlyCronProp {
    onChange(e?: string[]): void
    value: string[]
    translate(e: string): string,
    isDisabled?: boolean
}
interface State {
    every: boolean
}
const HourlyCron: FunctionComponent<HourlyCronProp> = (props) => {
    const [state, setState] = useState<State>({every: false})

    useEffect(() => {
        if(props.value[2].split('/')[1] || props.value[2] === '*') {
            setState({...state, every: true})
        }
    }, [])


    const onHourChange = (e: {target: { value: string}}) => {
        if(props.isDisabled!==true && state.every && ((parseInt(e.target.value) > 0 && parseInt(e.target.value) < 24) || e.target.value === '')) {
            let val = ['0','0','*','*','*','?','*'];
            val[1] = props.value[1];
            val[2] = e.target.value ? `0/${e.target.value}` : e.target.value;
            val[3] = '1/1';
            props.onChange(val)
        } 
    }
    const onMinuteChange = (e: {target: { value: string}}) => {
        if(props.isDisabled!==true && state.every && ((parseInt(e.target.value) > 0 && parseInt(e.target.value) < 60) || e.target.value === '')) {
            let val = ['0','0','*','*','*','?','*'];
            val[1] = e.target.value
            val[2] = props.value[2];
            val[3] = '1/1';
            props.onChange(val)
        } 
    }

    const onAtHourChange = (e: { target: { value: string; }; }) => {
        if(props.isDisabled === true) { return }
        let val = ['0',props.value[1],'*','1/1','*','?','*']
        val[2] = `${e.target.value}`;
        props.onChange(val)
    }

    const onAtMinuteChange = (e: { target: { value: string; }; }) => {
        if(props.isDisabled === true) { return }
        let val = ['0','*', props.value[2],'1/1','*','?','*']
        val[1] = `${e.target.value}`;
        props.onChange(val)
    }
    const translateFn = props.translate;
    return (   
        <div className="tab-content">              
            <div className="tab-pane active">
                <div className="well well-small">
                    <input type="radio" onChange={(e) => { if (props.isDisabled === true) { return}setState({ ...state, every:true }) ; props.onChange(['0','0','0/1','1/1','*','?','*'])}} checked={state.every} disabled={props.isDisabled} />
                    <span>{translateFn('Every')} </span>
                    <input disabled={!state.every || props.isDisabled} type="Number" onChange={onHourChange} value={props.value[2].split('/')[1] ? props.value[2].split('/')[1] : ''}  />
                    <span>{translateFn('hour')}</span>
                    <input disabled={!state.every} type="Number" onChange={onMinuteChange} value={props.value[1]}  />
                    <span>{translateFn('minute(s)')}</span>
                </div>
                <div className="well well-small margin-right-0 margin-left-0">
                <div className="text_align_right" style={{width:'100%'}}>
                    <input type="radio" onChange={(e) => {if (props.isDisabled === true) { return}setState({ every: false }); props.onChange();}} checked={!state.every} disabled={props.isDisabled}/>
                    <span className="">{translateFn('At')}</span>
                    <Hour disabled={state.every || props.isDisabled} onChange={onAtHourChange} value={props.value[2]} />
                    <Minutes disabled={state.every || props.isDisabled} onChange={onAtMinuteChange} value={props.value[1]} />
                </div>
                </div>
            </div>
        </div>
    )
}

export default HourlyCron;