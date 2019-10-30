import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Object extends Component {
    render() {
        const title = this.props.object.title.value;
        const cho = this.props.object.cho.value;
        const pic = this.props.object.pic.value;
        const date = this.props.object.date.value;
        return (
            <div className="singleObject">
                    <p>{ title }</p>
                    <img className="singleObjectPic" src={ pic } alt={ title }></img>
                    <p>{ date }</p>
                    <button onClick={() => this.props.compare(this.props.object)} >Dit object is ouder!</button>
                <a href={ cho } target="_blank" rel="noopener noreferrer">Meer info over dit object</a>
            </div>
        )
    }
}

// PropTypes
Object.propTypes = {
    object: PropTypes.object.isRequired,
}

export default Object