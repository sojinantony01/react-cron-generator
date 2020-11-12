import { Component } from 'react';
export interface Props {
    value?: string;
    timezone?: string;
    onChange: (value: string, timezone?: string) => void;
    serverTimezone?: string;
}
export interface State {
    value: string[];
    convertedValue: string[];
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
