import React, { useState, useEffect } from 'react';
import utils from './utils';
import '../styles/index.css';

const OP_SIGN = ['+', '-', '/', '*', '='];

const DigitGrid = props => {
    //const componentType = props.type;

    //console.log("inside digitgrid: " + props.number);
    return <button className="grid" onClick={() => props.onClick(props.number, props.type)}>{props.number}</button>;

};

const OperationGrid = props => {


    return <button className="grid" onClick={() => props.onClick(props.number, props.type)}>{OP_SIGN[props.number]}</button>;

};

const displayValues = [0];


const Display = props => {

    return <div>{props.values}</div>;
};


export default function App() {



    const [displayValues, setDisplayValues] = useState([0]);


    const handleClick = (number, type) => {

        //console.log(type);

        //const [operation, setOperation] = useState('');
        //const [buttonClickType, setButtonClickType] = useState("");

        // console.log("inside if " + number + "& " + buttonClickType);

        //setOperation(OP_SIGN[number]);
        //displayValues.push(OP_SIGN[number]);

        //setButtonClickType(type);

        if (type == "digit") {

            if (displayValues.length >= 1 && number != 0) {
                setDisplayValues([...displayValues, number]);
            } else {
                setDisplayValues([number]);
            }


        } else if (type == "operation") {


            setDisplayValues([...displayValues, OP_SIGN[number]]);
        }



    };

    return (
        <div className="body">
            This is a sample stateful and server-side
            rendered React application.
            <br />
            <br />
      Here is a button that will track
      how many times you click it:
            <br />
            <br />
            <div className="top-box">
                <Display values={displayValues} />
            </div>
            <div className="bottom-box">

                {
                    utils.range(0, 9).map(number =>
                        <DigitGrid key={number} type="digit" number={number} onClick={handleClick} />
                    )
                }
                {
                    utils.range(0, 4).map(number =>
                        <OperationGrid key={number} type="operation" number={number} onClick={handleClick} />
                    )
                }
            </div>

        </div >
    );
}