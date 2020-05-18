import { Component } from 'react';
export interface Props {
  value?: string;
  onChange: (value: string) => void;
}
export interface State {
  value: string[];
  selectedTab?: string;
}
export default class Cron extends Component<Props, State> {
  readonly state: Readonly<State>;
  componentDidMount(): void;
  onValueChange(value: string[]): void;
  makeDefaultValueForTab(tab: string): string[];
  onTabSelect(selectedTab: string): void;
  getHeaders(): JSX.Element[];
  getTabComponent(): JSX.Element;
  getFooter(): JSX.Element;
  render(): JSX.Element;
}
