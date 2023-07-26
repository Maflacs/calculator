import React, { useState } from 'react';
import './App.css';

function App() {
  const [formula, setFormula] = useState('0');
  const [displayText, setDisplayText] = useState('0');
  const [operator, setOperator] = useState(null);
  const [isResultShown, setIsResultShown] = useState(false);
  const [hasDecimal, setHasDecimal] = useState(false);

  const handleNumberClick = (value) => {
    if (isResultShown) {
      setFormula(value);
      setDisplayText(value);
      setIsResultShown(false);
    } else {
      setFormula((prevFormula) => (prevFormula === '0' ? value : prevFormula + value));
      setDisplayText(value);
    }
  };

  const handleOperatorClick = (selectedOperator) => {
    if (operator && !isResultShown) {
      setFormula((prevFormula) => prevFormula + selectedOperator);
      setDisplayText(selectedOperator);
    } else if (!isResultShown) {
      setFormula((prevFormula) => (prevFormula === '0' ? selectedOperator : prevFormula + selectedOperator));
      setDisplayText(selectedOperator);
    }

    setOperator(selectedOperator);
    setIsResultShown(false);
    setHasDecimal(false);
  };

  const calculateResult = () => {
    try {
      const result = eval(formula);
      setFormula(result.toString());
      setDisplayText(result.toString());
    } catch (error) {
      setFormula('0');
      setDisplayText('Error');
    }
    setOperator(null);
  };

  const handleEqualsClick = () => {
    if (!isResultShown) {
      calculateResult();
      setIsResultShown(true);
    }
  };

  const handleDecimalClick = () => {
    if (isResultShown) {
      setFormula('0.');
      setDisplayText('0.');
      setIsResultShown(false);
      setHasDecimal(true);
    } else if (!hasDecimal) {
      setFormula((prevFormula) => prevFormula + '.');
      setDisplayText((prevDisplay) => (prevDisplay === '0' || operator ? '0.' : prevDisplay + '.'));
      setHasDecimal(true);
    }
  };

  const handleClearClick = () => {
    setFormula('0');
    setDisplayText('0');
    setIsResultShown(false);
    setOperator(null);
    setHasDecimal(false);
  };

  return (
    <div className='calculator'>
      <div className='formula'>{formula}</div>
      <div id='display'>{displayText}</div>
      <div className='buttons'>
        <div id='clear' className='big' onClick={handleClearClick}>
          AC
        </div>
        <div id='divide' className='big' onClick={() => handleOperatorClick('/')}>
          /
        </div>
        <div id='multiple' className='big' onClick={() => handleOperatorClick('*')}>
          x
        </div>
        <div id='seven' onClick={() => handleNumberClick('7')}>
          7
        </div>
        <div id='eight' onClick={() => handleNumberClick('8')}>
          8
        </div>
        <div id='nine' onClick={() => handleNumberClick('9')}>
          9
        </div>
        <div id='subtra ct' className='big' onClick={() => handleOperatorClick('-')}>
          -
        </div>
        <div id='four' onClick={() => handleNumberClick('4')}>
          4
        </div>
        <div id='five' onClick={() => handleNumberClick('5')}>
          5
        </div>
        <div id='six' onClick={() => handleNumberClick('6')}>
          6
        </div>
        <div id='add' className='big' onClick={() => handleOperatorClick('+')}>
          +
        </div>
        <div id='one' onClick={() => handleNumberClick('1')}>
          1
        </div>
        <div id='two' onClick={() => handleNumberClick('2')}>
          2
        </div>
        <div id='three' onClick={() => handleNumberClick('3')}>
          3
        </div>
        <div id='zero' className='big' onClick={() => handleNumberClick('0')}>
          0
        </div>
        <div id='decimal' className='big' onClick={handleDecimalClick}>
          .
        </div>
        <div id='equals' className='big' onClick={handleEqualsClick}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
