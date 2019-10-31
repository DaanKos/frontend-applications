import React, { Component } from 'react';
import Object from './Object';
import PropTypes from 'prop-types';

class Objects extends Component {
    compare = (object) => {
        // Have to use "o" instead of "object" because the object term is occupied, using "object" would cause problems
        const otherObject = this.props.objects.find((o) => o.cho.value !== object.cho.value)
        if (otherObject.date.value > object.date.value) {
            this.props.rightAnswerGiven();
        }
        if (otherObject.date.value < object.date.value) {
            this.props.wrongAnswerGiven();
        }
    }

    render() {
        return this.props.objects.map((object) => (
            <Object key={object.cho.value} object={object} compare={this.compare} isCurrentlyDisabled={this.props.isCurrentlyDisabled} />
        ));
    }
}

// PropTypes
Objects.propTypes = {
    objects: PropTypes.array.isRequired,
}

export default Objects;
