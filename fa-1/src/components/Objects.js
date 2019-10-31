import React, { Component } from 'react';
import Object from './Object';
import PropTypes from 'prop-types';

class Objects extends Component {
    state = {
        isCurrentlyDisabled: false,
    }

    compare = (object) => {
        const otherObject = this.props.objects.find((o) => o.cho.value !== object.cho.value)
        if (otherObject.date.value > object.date.value) {
            console.log("Je hebt het goed");
            this.setState({ isCurrentlyDisabled : false })
            let value = sessionStorage.getItem('CurrentScore');
            value = Number(value) + 1;
            sessionStorage.setItem('CurrentScore', value);
            console.log(sessionStorage);
            this.props.updateScoring();
        }
        if (otherObject.date.value < object.date.value) {
            console.log("Je hebt het fout");
            this.setState({ isCurrentlyDisabled : false })
            let value = sessionStorage.getItem('CurrentScore');
            value = 0;
            sessionStorage.setItem('CurrentScore', value);
            console.log(sessionStorage);
            this.props.updateScoring();
        }
    }

    render() {
        return this.props.objects.map((object) => (
            <Object key={object.cho.value} object={object} compare={this.compare} isCurrentlyDisabled={this.state.isCurrentlyDisabled} />
        ));
    }
}

// PropTypes
Objects.propTypes = {
    objects: PropTypes.array.isRequired,
}

export default Objects;
