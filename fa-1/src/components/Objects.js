import React, { Component } from 'react';
import Object from './Object';
import PropTypes from 'prop-types';

class Objects extends Component {
    compare = (object) => {
        const otherObject = this.props.objects.find((o) => o.cho.value !== object.cho.value)
        console.log(otherObject);
    }

    render() {
        return this.props.objects.map((object) => (
            <Object key={object.cho.value} object={object} compare={this.compare} />
        ));
    }
}

// PropTypes
Objects.propTypes = {
    objects: PropTypes.array.isRequired,
}

export default Objects;
