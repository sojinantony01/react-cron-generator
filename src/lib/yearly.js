import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import I18 from '../../../../../i18'


class Cron extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (<div>
            
                yearly
        </div>)
    }
}

Cron.propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(connect(store => ({ 
    user: store.user,
    actions: store.actions,
    translations :store.translations,
}))(Cron));