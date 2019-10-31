import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class Object extends Component {
    state = {
        invisibleClassName: 'invisibleClass',
        visibleClassName: 'visibleClass',
    }
    
    render() {
        const title = this.props.object.title.value;
        const cho = this.props.object.cho.value;
        const pic = this.props.object.pic.value;
        const date = this.props.object.date.value;
        const isCurrentlyDisabled = this.props.isCurrentlyDisabled;
        const visibleClassName = this.state.visibleClassName;
        const invisibleClassName = this.state.invisibleClassName;
        let currentVisibilityClass = "";

        if (isCurrentlyDisabled === true){
            currentVisibilityClass = visibleClassName;
        }

        if (isCurrentlyDisabled === false){
            currentVisibilityClass = invisibleClassName;
        }

        return (
            <div className="singleObject">
                    <p>{ title }</p>
                    <img className="singleObjectPic" src={ pic } alt={ title }></img>
                    <p className={ currentVisibilityClass }>{ date }</p>
                    <button disabled={isCurrentlyDisabled} onClick={() => this.props.compare(this.props.object)} >Dit object is ouder!</button>
                <a className={ currentVisibilityClass } href={ cho } target="_blank" rel="noopener noreferrer">Meer info over dit object</a>
            </div>
        )
    }
}

// PropTypes
Object.propTypes = {
    object: PropTypes.object.isRequired,
}

export default Object