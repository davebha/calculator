import React, { useState, useEffect } from 'react';
import utils from './utils';
import '../styles/index.css';

const OP_SIGN = ["+", "-", "/", "*", "="];

const GROUPING_SIGN = ["(", ")"];

const DigitGrid = props => {
    //const componentType = props.type;

    //console.log("inside digitgrid: " + props.number);
    return <button className="grid" onClick={() => props.onClick(props.number, props.type)}>{props.number}</button>;

};

const GroupingGrid = props => {

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
        const lastValueIndex = displayValues.length - 1;
        const displayValuesLastValue = displayValues[lastValueIndex];
        const strNumber = String(number);

        if (type == "digit") {

            if (displayValues.length == 1) {

                if (displayValues.includes("0")) {

                    if (number != 0) {

                        setDisplayValues([strNumber]);

                    }

                } else {
                    // console.log(valueCopy);
                    valueCopy[0] = valueCopy[0] + strNumber;
                    //console.log(valueCopy);
                    setDisplayValues([...valueCopy]);
                }

            } else {

                if (parseInt(displayValuesLastValue) == 0) {

                    valueCopy[lastValueIndex] = strNumber;
                    setDisplayValues([...valueCopy]);
                    console.log(displayValues);

                } else if (parseInt(displayValuesLastValue)) {
                    valueCopy[lastValueIndex] = valueCopy[lastValueIndex] + strNumber;
                    setDisplayValues([...valueCopy]);
                    console.log(displayValues);
                } else {

                    setDisplayValues([...displayValues, strNumber]);
                    console.log(displayValues);
                }

            }

        } else if (type == "operation") {

            if (parseInt(displayValuesLastValue)) {

                setDisplayValues([...displayValues, OP_SIGN[number]]);
                console.log(displayValues);
            }


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
                    utils.range(0, 1).map(number =>
                        <GroupingGrid key={number} type="digit" number={number} onClick={handleClick} />
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