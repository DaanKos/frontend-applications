import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Object extends Component {
    getStyle = () => {
        return {
            backgroundColor: '#f6f6f6',
            padding: '1rem',
            display: 'inline-block',
            width: '45%',
            margin: '2.5%',
            borderRadius: '1rem',
        }
    }
    
    render() {
        const title = this.props.object.title.value;
        const cho = this.props.object.cho.value;
        const pic = this.props.object.pic.value;
        const date = this.props.object.date.value;
        return (
            <div style={this.getStyle()}>
                    <img style={ picStyle } src={ pic } alt={ title }></img>
                    <p>{ title }</p>
                    <p>{ date }</p>
                    <button onClick={() => this.props.compare(this.props.object)} >Dit object is ouder!</button>
                <a href={ cho }>Meer info over dit object</a>
            </div>
        )
    }
}

// PropTypes
Object.propTypes = {
    object: PropTypes.object.isRequired,
}

// Styles
const picStyle = {
    height: '200px',
    width: 'auto',
}

export default Object