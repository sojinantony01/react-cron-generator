import moment from 'moment-timezone';
import React, { Component } from 'react';
// @ts-ignore
import { Typeahead } from 'react-bootstrap-typeahead';
interface TzDropdownState {
  isOpen: boolean;
}

export interface TzDropdownProps {
  id: string;
  onChange: (tz: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}

export class TzDropdown extends Component<TzDropdownProps, TzDropdownState> {
  state: Readonly<TzDropdownState> = {
    isOpen: false,
  };
  protected toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    return (
      <Typeahead
        disabled={this.props.disabled}
        multiple={false}
        data-testid={`timezone-dropdown-${this.props.id}`}
        id={`timezone-dropdown-${this.props.id}`}
        onChange={(selected) => {
          this.props.onChange(selected[0]);
        }}
        options={moment.tz.names()}
        emptyLabel="No Timezone found"
        placeholder="Select a Timezone"
        selected={this.props.defaultValue ? [this.props.defaultValue] : []}
      />
    );
  }
}
