import { Component } from 'react';
export interface CronOnChangeEvent {
    serverCronString: string;
    clientCronString?: string;
    timezone?: string;
}
export interface Props {
    value?: string;
    timezone?: string;
    onChange: (event: CronOnChangeEvent) => void;
    serverTimezone?: string;
}
export interface State {
    clientCron: string[];
    serverCron: string[];
    timezone?: string;
    selectedTab?: string;
}
export default class Cron extends Component<Props, State> {
    constructor(props: Props);
    readonly state: Readonly<State>;
    componentDidMount(): void;
    onValueChange(value: string[], timezone?: string): void;
    makeDefaultValueForTab(tab: string): string[];
    onTabSelect(selectedTab: string): void;
    getHeaders(): JSX.Element[];
    getTabComponent(): JSX.Element;
    getFooter(): JSX.Element;
    render(): JSX.Element;
}
