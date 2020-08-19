import React, { useState, useEffect } from 'react';
import utils from './utils';
import '../styles/index.css';



const OP_SIGN = ["/", "*", "+", "-"];

const GROUPING_SIGN = ["(", ")"];

//const displayValues = [];

const Grid = props => {
    return <button className="grid" onClick={() => props.onClick(props.number, props.type)}>{output(props.number, props.type)}</button>;

};

const Clear = props => {
    return <button className="grid" onClick={() => props.onClick(props.number, props.type)}>{"C"}</button>
};
const Equals = props => {

    return <button className="grid" onClick={() => props.onClick(props.valueToOperate)}>{"="}</button>;
}
const output = (number, type) => {

    if (type == "digit") {
        return number;
    } else if (type == "grouping") {
        return GROUPING_SIGN[number];
    } else if (type == "operation") {
        return OP_SIGN[number];
    }

}

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

                } else if (displayValues.includes("(")) {

                    setDisplayValues([...displayValues, strNumber]);

                } else {
                    // console.log(valueCopy);
                    valueCopy[0] = valueCopy[0] + strNumber;
                    console.log(valueCopy);
                    setDisplayValues([...valueCopy]);
                }


            } else {

                if (parseInt(displayValuesLastValue) == 0) {

                    valueCopy[lastValueIndex] = strNumber;
                    setDisplayValues([...valueCopy]);
                    console.log(displayValues);

                } else if (displayValuesLastValue == ")") {

                    valueCopy[lastValueIndex] = "*";
                    setDisplayValues([...displayValues, valueCopy[lastValueIndex], strNumber]);


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

            if (parseInt(displayValuesLastValue) >= 0 || displayValuesLastValue === ")") {

                setDisplayValues([...displayValues, OP_SIGN[number]]);
                console.log(displayValues);
            }


        } else if (type == "grouping") {

            if (parseInt(displayValuesLastValue) == 0) {

                valueCopy[lastValueIndex] = GROUPING_SIGN[number];
                setDisplayValues([...valueCopy]);

            } else if (parseInt(displayValuesLastValue) && number == 0) {

                valueCopy[lastValueIndex] = "*";
                setDisplayValues([...displayValues, valueCopy[lastValueIndex], GROUPING_SIGN[number]]);
            } else {

                setDisplayValues([...displayValues, GROUPING_SIGN[number]]);
            }



        } else if (type == "clear") {

            //valueCopy = [];
            setDisplayValues(["0"]);

        }

        console.log(displayValues);


    };

    const Calculate = (valuesToCalculate) => {



        const arr_length = valuesToCalculate.length;
        var operationsResults = [parseInt(valuesToCalculate[0]), 0];
        var result = 0;
        var operationIndex = 1;
        var operation = 0;
        var secondOperandIndex = operationIndex + 1;
        var secondOperand = 0;
        console.log("In calculate");
        console.log(valuesToCalculate);

        if (arr_length != 1) {

            if (valuesToCalculate.includes("/") || valuesToCalculate("*")) {

                while (secondOperandIndex < arr_length) {
                    operation = valuesToCalculate[operationIndex];
                    secondOperand = parseInt(valuesToCalculate[secondOperandIndex]);
                    console.log("Operation to do is: " + operation);
                    console.log("second operand is: " + secondOperand);

                    switch (operation) {

                        case "/":

                            result = result / secondOperand;
                            break;

                        case "*":
                            result = result * secondOperand;
                            break;


                    }
                    console.log("Result right now is: " + result);
                    operationIndex += 2;
                    secondOperandIndex += 2;

                }
            } else if (valuesToCalculate.includes("+") || valuesToCalculate.includes("-")) {

                while (secondOperandIndex < arr_length) {
                    operation = valuesToCalculate[operationIndex];
                    secondOperand = parseInt(valuesToCalculate[secondOperandIndex]);
                    console.log("Operation to do is: " + operation);
                    console.log("second operand is: " + secondOperand);

                    switch (operation) {

                        case "+":

                            result = result + secondOperand;
                            break;

                        case "-":
                            result = result - secondOperand;
                            break;


                    }
                    console.log("Result right now is: " + result);
                    operationIndex += 2;
                    secondOperandIndex += 2;

                }



            }







        }

        console.log("result is " + result);
        setDisplayValues([result]);

    }


    return (
        <div className="body">
            <h2>Sample calculator application.</h2>
            <br />
            <br />

            <br />
            <br />
            <div className="top-box">
                <Display values={displayValues} />
            </div>
            <div className="bottom-box">

                {
                    utils.range(7, 9).map(number =>
                        <Grid key={number} type="digit" number={number} onClick={handleClick} />
                    )
                }
                {<Grid type="operation" number={0} onClick={handleClick} />}

                {
                    utils.range(4, 6).map(number =>
                        <Grid key={number} type="digit" number={number} onClick={handleClick} />
                    )
                }
                {<Grid key={1} type="operation" number={1} onClick={handleClick} />}
                {
                    utils.range(1, 3).map(number =>
                        <Grid key={number} type="digit" number={number} onClick={handleClick} />
                    )
                }
                {<Grid key={2} type="operation" number={2} onClick={handleClick} />}
                {
                    <Equals valueToOperate={displayValues} onClick={Calculate} />
                }
                {
                    <Grid key={0} type="digit" number={0} onClick={handleClick} />
                }
                {
                    <Clear type="clear" onClick={handleClick} />
                }
                {<Grid key={3} type="operation" number={3} onClick={handleClick} />}
                {
                    utils.range(0, 1).map(number =>
                        <Grid key={number} type="grouping" number={number} onClick={handleClick} />
                    )
                }
            </div>

        </div >
    );
}