import React, { Component } from 'react'

export class Object extends Component {
    // State in which I declare to classnames which are used for showing/hiding the year of creation and link for more info
    state = {
        invisibleClassName: 'invisibleClass',
        visibleClassName: 'visibleClass',
    }
    
    // This renders the object component
    render() {
        const title = this.props.object.title.value;
        const cho = this.props.object.cho.value;
        const pic = this.props.object.pic.value;
        const date = this.props.object.date.value;
        const answerButtonDisabled = this.props.answerButtonDisabled;
        const visibleClassName = this.state.visibleClassName;
        const invisibleClassName = this.state.invisibleClassName;
        let currentVisibilityClass = "";

        // This code checks wether the year of creation and link for more info should be visible or not
        // It adds the appropriate className to the currentVisiblityClass, which is the className on the elements that require hiding/showing
        if (answerButtonDisabled === true){
            currentVisibilityClass = visibleClassName;
        }

        if (answerButtonDisabled === false){
            currentVisibilityClass = invisibleClassName;
        }

        // This is the actual output which is meant for the DOM
        return (
            <div className="singleObject">
                    <p>{ title }</p>
                    <img className="singleObjectPic" src={ pic } alt={ title }></img>
                    <p className={ currentVisibilityClass }>{ date }</p>
                    <button disabled={answerButtonDisabled} onClick={() => this.props.compare(this.props.object)} >Dit object is ouder!</button>
                <a className={ currentVisibilityClass } href={ cho } target="_blank" rel="noopener noreferrer">Meer info over dit object</a>
            </div>
        )
    }
}

export default Object