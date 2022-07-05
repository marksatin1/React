import React, { useState } from 'react';

import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import ButtonBox from './components/ButtonBox';
import Button from './components/Button';

const btnValues = [
  ['C', '+-', '%', '/'],
  [7, 8, 9, '*'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '='],
];

const removeSpaces = (num) => num.toString().replace(/\s/g, '');

const computeRes = (sign, a, b) =>
  sign === '+' ? a + b : sign === '-' ? a - b : sign === '*' ? a * b : a / b;

const App = () => {
  const [calc, setCalc] = useState({
    sign: '',
    num: 0,
    res: 0,
  });

  const numClickHandler = (event) => {
    const value = event.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc((prev) => ({
        ...prev,
        num:
          prev.num % 1 === 0 && !prev.num.toString().includes('.')
            ? Number(prev.num + value)
            : prev.num + value,
        res: !prev.sign ? 0 : prev.res,
      }));
    }
  };

  const decimalClickHandler = (event) => {
    const value = event.target.innerHTML;

    setCalc((prev) => ({
      ...prev,
      num: !prev.num.toString().includes('.') ? prev.num + value : prev.num,
    }));
  };

  const signClickHandler = (event) => {
    const value = event.target.innerHTML;

    setCalc((prev) => ({
      sign: value,
      num: 0,
      res: !prev.num
        ? prev.res
        : !prev.res
        ? prev.num
        : computeRes(prev.sign, Number(prev.res), Number(prev.num)),
    }));
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      setCalc((prev) => ({
        sign: '',
        num: 0,
        res:
          prev.num === '0' && prev.sign === '/'
            ? "Can't divide by 0"
            : computeRes(prev.sign, Number(prev.res), Number(prev.num)),
      }));
    }
  };

  const invertClickHandler = () => {
    setCalc((prev) => ({
      sign: '',
      num: prev.num ? prev.num * -1 : 0,
      res: prev.res ? prev.res * -1 : 0,
    }));
  };

  const percentClickHandler = () => {
    setCalc((prev) => ({
      sign: '',
      num: prev.num ? prev.num / 100 : 0,
      res: prev.res ? prev.res / 100 : 0,
    }));
  };

  const resetClickHandler = () => {
    setCalc({
      sign: '',
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, index) => {
          return (
            <Button
              key={index}
              className={btn === '=' ? 'equals' : ''}
              value={btn}
              onClick={
                btn === 'C'
                  ? resetClickHandler
                  : btn === '+-'
                  ? invertClickHandler
                  : btn === '%'
                  ? percentClickHandler
                  : btn === '='
                  ? equalsClickHandler
                  : btn === '/' || btn === '*' || btn === '-' || btn === '+'
                  ? signClickHandler
                  : btn === '.'
                  ? decimalClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
