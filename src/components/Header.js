import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    const onClick =()=>{
        console.log('Clicked!')
    }

    return (
        <header className = 'header'>
            <h1 >{title}</h1>   
            <Button 
                color={!showAdd ? "green" : "red"} 
                text = {!showAdd ? "Add" : "Close"}
                onClick={onAdd}
            />
        </header>
    )
}
// default props for Header component
Header.defaultProps = {
    title:'Task-Tracker'
}
// setting prop types
Header.prototype = {
    title : PropTypes.string.isRequired
}

// using style object to assign styles to components
// const headingStyles = {
//     color:'red', 
//     backgroundColor:'cyan'
// }

export default Header