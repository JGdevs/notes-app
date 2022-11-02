import './switch.css';

const Switch = ({onSwitch,checked}) => {

    return (
            
        <label className="switch">
            
            <input type="checkbox" onChange={onSwitch} checked={checked}/>
            <span className="slider"></span>

        </label>
    );

}

export default Switch;
