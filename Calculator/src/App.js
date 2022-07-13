import React, { useState } from 'react';

import Wrapper from './components/BasicCalc/Wrapper';
import Screen from './components/BasicCalc/Screen';
import ButtonBox from './components/BasicCalc/ButtonBox';
import Button from './components/BasicCalc/Button';

const utilBtnValues = ['Expand', 'History', 'Graph'];

const basicBtnValues = [
  ['C', '+-', '%', '/'],
  [7, 8, 9, '*'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '='],
];

const sciBtnValues = [
  ['√', 'x^y', 'inv'],
  ['log', 'e', 'π'],
  ['sin()', 'cos()', 'tan()'],
];

const removeSpaces = (num) => num.toString().replace(/\s/g, '');

// Arithmetic calc logic
const computeRes = (oper, a, b) =>
  oper === '+'
    ? a + b
    : oper === '-'
    ? a - b
    : oper === '*'
    ? a * b
    : oper === '/'
    ? a / b
    : Math.pow(a, b);

const App = () => {
  const [calc, setCalc] = useState({
    oper: '',
    num: 0,
    res: 0,
  });
  const [expand, setExpand] = useState(false);

  console.log(calc);

  const expandClickHandler = () => {
    setExpand((prev) => !prev);
  };

  const historyClickHandler = () => {
    // showHistory state
  };

  const graphClickHandler = () => {
    // showGraph state
  };

  //CALC HANDLERS
  const numClickHandler = (event) => {
    let value = event.target.innerHTML;

    if (value === 'π') {
      value = Math.PI;
    } else if (value === 'e') {
      value = Math.E;
    }

    if (removeSpaces(calc.num).length < 16) {
      setCalc((prev) => ({
        ...prev,
        num:
          prev.num % 1 === 0 && !prev.num.toString().includes('.')
            ? Number(prev.num + value) //Removes leading 0 for whole numbers
            : prev.num + value, //Ensures leading 0 for decimal number
        res: !prev.oper ? 0 : prev.res,
      }));
    }
  };

  const decimalClickHandler = (event) => {
    //value = '.'
    const value = event.target.innerHTML;

    setCalc((prev) => ({
      ...prev,
      num: !prev.num.toString().includes('.') ? prev.num + value : prev.num,
    }));
  };

  const operatorClickHandler = (event) => {
    const value = event.target.innerHTML;

    setCalc((prev) => ({
      oper: value,
      num: 0,
      res: !prev.num ? prev.res : prev.num,
    }));
  };

  const equalsClickHandler = () => {
    if (calc.oper && calc.num) {
      setCalc((prev) => ({
        oper: '',
        num: 0,
        res:
          prev.num === '0' && prev.oper === '/'
            ? "Can't divide by 0"
            : computeRes(prev.oper, Number(prev.res), Number(prev.num)),
      }));
    }
  };

  const signClickHandler = () => {
    setCalc((prev) => ({
      oper: '',
      num: prev.num ? prev.num * -1 : 0, //Checks to prevent -0
      res: prev.res ? prev.res * -1 : 0,
    }));
  };

  const percentClickHandler = () => {
    setCalc((prev) => ({
      oper: '',
      num: prev.num / 100,
      res: prev.res / 100,
    }));
  };

  const resetClickHandler = () => {
    setCalc({
      oper: '',
      num: 0,
      res: 0,
    });
  };

  const sqRootClickHandler = () => {
    setCalc((prev) => ({
      oper: '',
      num: prev.num >= 0 ? Math.sqrt(prev.num) : 0,
      res: prev.res >= 0 ? Math.sqrt(prev.res) : 0,
    }));

    //else: tooltip requiring sign to be positive for sqroot
  };

  const inverseClickHandler = () => {
    setCalc((prev) => ({
      oper: '',
      num: prev.num !== 0 ? 1 / prev.num : 0, //Checks applied individually to num & res
      res: prev.res !== 0 ? 1 / prev.res : 0,
    }));
  };

  const logClickHandler = () => {
    setCalc((prev) => ({
      oper: '',
      num: prev.num > 0 ? Math.log10(prev.num) : 0,
      res: prev.res > 0 ? Math.log10(prev.res) : 0,
    }));

    //else: tooltip requiring sign to be positive for log
  };

  const sinClickHandler = () => {
    setCalc((prev) => ({
      oper: '',
      num: Math.sin(prev.num),
      res: Math.sin(prev.res),
    }));
  };

  const cosClickHandler = () => {
    setCalc((prev) => ({
      oper: '',
      num: prev.num ? Math.cos(prev.num) : 0,
      res: prev.res ? Math.cos(prev.res) : 0,
    }));
  };

  const tanClickHandler = () => {
    setCalc((prev) => ({
      oper: '',
      num: Math.tan(prev.num),
      res: Math.tan(prev.res),
    }));
  };

  return (
    <>
      <Wrapper className={'basic-wrapper'}>
        <Screen value={calc.num ? calc.num : calc.res} />
        <ButtonBox className={'utility-button-box'}>
          {utilBtnValues.map((btn, index) => {
            return (
              <Button
                key={index}
                className={'utility-button'}
                value={btn}
                onClick={
                  btn === 'Expand'
                    ? expandClickHandler
                    : btn === 'History'
                    ? historyClickHandler
                    : graphClickHandler
                }
              />
            );
          })}
        </ButtonBox>
        <ButtonBox className={'basic-button-box'}>
          {basicBtnValues.flat().map((btn, index) => {
            return (
              <Button
                key={index}
                className={btn === '=' ? 'basic-button equals' : 'basic-button'}
                value={btn}
                onClick={
                  btn === 'C'
                    ? resetClickHandler
                    : btn === '+-'
                    ? signClickHandler
                    : btn === '%'
                    ? percentClickHandler
                    : btn === '/' || btn === '*' || btn === '-' || btn === '+'
                    ? operatorClickHandler
                    : btn === '.'
                    ? decimalClickHandler
                    : btn === '='
                    ? equalsClickHandler
                    : numClickHandler
                }
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
      {expand && (
        <Wrapper className={'sci-wrapper'}>
          <ButtonBox>
            {sciBtnValues.flat().map((btn, index) => {
              return (
                <Button
                  key={index}
                  className={'sci-button'}
                  value={btn}
                  onClick={
                    btn === '√'
                      ? sqRootClickHandler
                      : btn === 'x^y'
                      ? operatorClickHandler
                      : btn === 'inv'
                      ? inverseClickHandler
                      : btn === 'log'
                      ? logClickHandler
                      : btn === 'e'
                      ? numClickHandler
                      : btn === 'π'
                      ? numClickHandler
                      : btn === 'sin()'
                      ? sinClickHandler
                      : btn === 'cos()'
                      ? cosClickHandler
                      : tanClickHandler
                  }
                />
              );
            })}
          </ButtonBox>
        </Wrapper>
      )}
    </>
  );
};

export default App;
