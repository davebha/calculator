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
        //var operationsResults = [parseInt(valuesToCalculate[0]), 0, 0, 0];
        var arrayAsCalculation = [];
        var firstOperandIndex = 0;
        var operationIndex = firstOperandIndex + 1;
        var operation = 0;
        var secondOperandIndex = operationIndex + 1;
        var result = 0;
        var firstOperand = 0;
        var secondOperand = 0;

        var operationResultStatus = [false, false, false, false];


        console.log("In calculate");
        console.log(valuesToCalculate);
        console.log("Array length is" + arr_length);
        if (arr_length != 1) {

            if (valuesToCalculate.includes("/") || valuesToCalculate.includes("*")) {

                while (secondOperandIndex < arr_length) {


                    firstOperand = parseInt(valuesToCalculate[firstOperandIndex]);
                    operation = valuesToCalculate[operationIndex];
                    secondOperand = parseInt(valuesToCalculate[secondOperandIndex]);

                    console.log("first operand is: " + firstOperand);
                    console.log("Operation to do is: " + operation);
                    console.log("second operand is: " + secondOperand);

                    if (operation != "/" && operation != "*") {

                        arrayAsCalculation.push(firstOperand);
                        arrayAsCalculation.push(operation);
                        if ((valuesToCalculate[secondOperandIndex + 1] != "/" && valuesToCalculate[secondOperandIndex + 1] != "*")
                            && valuesToCalculate[secondOperandIndex + 1] != undefined) {

                            arrayAsCalculation.push(secondOperand);

                        }

                    }

                    while ((operation == "/" || operation == "*") && parseInt(secondOperand)) {

                        switch (operation) {

                            case "/":
                                result = firstOperand / secondOperand;
                                break;
                            case "*":
                                result = firstOperand * secondOperand;
                                break;

                        }

                        firstOperand = result;
                        operationIndex += 2;
                        secondOperandIndex += 2;
                        operation = valuesToCalculate[operationIndex];
                        secondOperand = parseInt(valuesToCalculate[secondOperandIndex]);
                        // console.log("first operand is: " + firstOperand);
                        // console.log("Operation to do is: " + operation);
                        // console.log("second operand is: " + secondOperand);
                    }

                    if (arrayAsCalculation != [])) {
                        arrayAsCalculation.push(result);
                    }

                    console.log("Result right now is: " + result);
                    if (secondOperandIndex < arr_length) {
                        firstOperandIndex += 2;
                        operationIndex += 2;
                        secondOperandIndex += 2;
                    }
                }

            }
            console.log(arrayAsCalculation);

            // if (valuesToCalculate.includes("+") || valuesToCalculate.includes("-")) {

            //     if (arrayAsCalculation.length > 0) {

            //         arr_length = arrayAsCalculation.length;
            //         operation = parseInt(arrayAsCalculation(firstOperand));
            //         secondOperand = parseInt(arrayAsCalculation(secondOperand));

            //     }

            //     console.log("first operand is: " + firstOperand);
            //     console.log("Operation to do is: " + operation);
            //     console.log("second operand is: " + secondOperand);

            //     while (secondOperandIndex < arr_length) {

            //     }


            //     firstOperandIndex = 0;
            //     operationIndex = firstOperandIndex + 1;
            //     secondOperandIndex = operationIndex + 1;

            //     while (secondOperandIndex < arr_length) {

            //         if (firstOperandIndex > 0) {
            //             firstOperand = result;

            //         }

            //         if (arrayAsCalculation != []) {

            //             if (firstOperandIndex < 0) {

            //                 firstOperand = arrayAsCalculation[firstOperandIndex];

            //             }

            //             operation = arrayAsCalculation[operationIndex];
            //             secondOperand = parseInt(arrayAsCalculation[secondOperandIndex]);
            //             console.log("Operation to do is: " + operation);
            //             console.log("second operand is: " + secondOperand);

            //             switch (operation) {

            //                 case "+":
            //                     result = firstOperand + secondOperand;

            //                     break;

            //                 case "-":
            //                     result = firstOperand - secondOperand;
            //                     break;


            //             }
            //             console.log("Result right now is: " + result);
            //             operationIndex += 2;
            //             secondOperandIndex += 2;

            //         }

            //     }

            //}
            // }

            console.log("result is " + result);
            setDisplayValues([result.toString()]);

        }

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