// import React, { Component } from 'react'
// import PropTypes from 'prop-types';

// export class TodoItem extends Component {
//     getStyle = () => {
//         return {
//             backgroundColor: '#f4f4f4',
//             padding: '10px',
//             borderBottom: '1px #ccc dotted', 
//             textDecoration: this.props.todo.completed ? 'line-through' : 'none'
//         }
//     }

//     getPicStyle = () => {
//         return {
//             height: '50px',
//             width: 'auto',
//         }
//     }
    
//     render() {
//         const title = this.props.todo.title.value;
//         const cho = this.props.todo.cho.value;
//         const pic = this.props.todo.pic.value;
//         const date = this.props.todo.date.value;
//         return (
//             <div style={this.getStyle()}>
//                 <p>
//                     <input type="checkbox" onChange={this.props.markComplete.bind(this, cho.value)}/> {' '}
//                     { title }
//                     <img style={this.getPicStyle()} src={ pic } alt={ title }></img>
//                     { date }
//                     <button onClick={this.props.delTodo.bind(this, cho.value)} style={btnStyle}>x</button>
//                 </p>
//             </div>
//         )
//     }
// }

// // PropTypes
// TodoItem.propTypes = {
//     todo: PropTypes.object.isRequired,
//     markComplete: PropTypes.func.isRequired,
//     delTodo: PropTypes.func.isRequired,
// }

// // Styles
// const btnStyle = {
//     background: '#ff0000',
//     color: '#fff',
//     border: 'none',
//     padding: '5px 9px',
//     borderRadius: '50%',
//     cursor: 'pointer',
//     float: 'right'
// }

// export default TodoItem