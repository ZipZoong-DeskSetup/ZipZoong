/* eslint-disable @next/next/no-img-element */
import {useState} from 'react';
import fourStyles from '@/components/Survey/SurveyBoxFour.module.scss';
import fiveStyles from '@/components/Survey/SurveyBoxFive.module.scss';

const SurveyBoxDuplicate = ({
  content,
  boxClick,
  design,
  isFocus,
}: {
  content: [string, string, 2 | 1 | 4 | 8 | 16][];
  boxClick: (focusing: (2 | 1 | 4 | 8 | 16)[]) => void;
  design: string;
  isFocus: (2 | 1 | 4 | 8 | 16 | -1)[];
}) => {
  const [value, setValue] = useState<(2 | 1 | 4 | 8 | 16 | -1)[]>(isFocus);

  let dContainer: string | undefined;
  let dBox: string | undefined;
  let dFocusBox: string | undefined;
  let dPositionContainer: string | undefined;
  let dContent: string | undefined;

  if (design === 'fourStyles') {
    dContainer = fourStyles.container;
    dBox = fourStyles.box;
    dFocusBox = fourStyles.focusBox;
    dPositionContainer = fourStyles.positionContainer;
    dContent = fourStyles.content;
  } else {
    dContainer = fiveStyles.container;
    dBox = fiveStyles.box;
    dFocusBox = fiveStyles.focusBox;
    dPositionContainer = fiveStyles.positionContainer;
    dContent = fiveStyles.content;
  }

  const addValue = (index: 2 | 1 | 4 | 8 | 16): (2 | 1 | 4 | 8 | 16)[] | [] => {
    let tempValue = [...value];
    if (tempValue.includes(-1)) {
      tempValue = tempValue.filter(valueBox => valueBox !== -1);
    }

    if (!tempValue.includes(-1)) {
      if (tempValue.includes(index)) {
        tempValue = tempValue.filter(v => v !== index);
      } else if (tempValue.length < 2) {
        tempValue.push(index);
      }
    }
    return tempValue as (2 | 1 | 4 | 8 | 16)[];
  };

  const handleBoxClick = (index: number) => {
    const newValue: (2 | 1 | 4 | 8 | 16)[] = addValue(content[index][2]);
    setValue(newValue);
    boxClick(newValue);
  };

  return (
    <div className={dContainer}>
      {content.map((item, index) => (
        <div key={index}>
          <button
            className={value.includes(content[index][2]) ? dFocusBox : dBox}
            onClick={() => handleBoxClick(index)}
          >
            <div className={dPositionContainer}>
              <div className={dContent}>{item[0]}</div>
              {item[1] !== '' &&
                typeof item[1] === 'string' &&
                typeof item[0] === 'string' && (
                  <div>
                    <img src={item[1]} alt={item[0]}></img>
                  </div>
                )}
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default SurveyBoxDuplicate;
