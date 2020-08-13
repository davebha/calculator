import React, { useState, useEffect } from 'react';
import utils from './utils';
import '../styles/index.css';

const OP_SIGN = ["+", "-", "/", "*", "="];

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



    const [displayValues, setDisplayValues] = useState(["0"]);


    const handleClick = (number, type) => {

        //const lastValue = displayValues[displayValues.length - 1];

        //const valueToConcat = 0;
        const valueCopy = Array.from(displayValues);
        const lastValueIndex = arrayCopy[arrayCopy.length - 1];
        const strNumber = String(number);
        if (type == "digit") {

            if (displayValues.length == 1) {

                if (displayValues.includes("0")) {

                    setDisplayValues(valueCopy);

                } else {
                    // console.log(valueCopy);
                    valueCopy[0] = valueCopy[0] + strNumber;
                    console.log(valueCopy);
                    setDisplayValues([...valueCopy]);
                }

            } else {

                if (lastValue.type == "operation") {

                }
                setDisplayValues([strNumber]);
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