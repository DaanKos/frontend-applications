import React, { Component } from 'react';
import Object from './Object';
import PropTypes from 'prop-types';

class Objects extends Component {
    compare = (object) => {
        // *Have to use "o" instead of "object" because the object term is occupied, using "object" would cause problems
        // This creates a const which is the "otherObject", the one the user did NOT click
        const otherObject = this.props.objects.find((o) => o.cho.value !== object.cho.value)

        // A couple of if statements that check if the user clicked the right or wrong answer, and fires the appropriate function
        if (otherObject.date.value > object.date.value) {
            this.props.rightAnswerGiven();
        }
        if (otherObject.date.value < object.date.value) {
            this.props.wrongAnswerGiven();
        }
        if (otherObject.date.value === object.date.value) {
            this.props.rightAnswerGiven();
        }
    }

    // This code renders the objects component
    render() {
        return this.props.objects.map((object) => (
            <Object key={object.cho.value} object={object} compare={this.compare} answerButtonDisabled={this.props.answerButtonDisabled} />
        ));
    }
}

// PropTypes
Objects.propTypes = {
    objects: PropTypes.array.isRequired,
}

export default Objects;
