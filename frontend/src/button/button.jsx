function Button(props) {
    return ( 
        <button onClick={props.increaseCounter}>Кнопка {props.counter}</button>
     );
}

export default Button;