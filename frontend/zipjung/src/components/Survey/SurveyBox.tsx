/* eslint-disable @next/next/no-img-element */
import {useState} from 'react';
import twoStyles from '@/components/Survey/SurveyBoxTwo.module.scss';
import threeStyles from '@/components/Survey/SurveyBoxThree.module.scss';
import fourStyles from '@/components/Survey/SurveyBoxFour.module.scss';
import fiveStyles from '@/components/Survey/SurveyBoxFive.module.scss';
import upperStyles from '@/components/Survey/SurveyBoxUp.module.scss';

const SurveyBox = ({
  content,
  boxClick,
  design,
  isFocus,
}: {
  content: (JSX.Element | string | number | boolean)[][];
  boxClick: (index: number) => void;
  design: string;
  isFocus: string | number | boolean;
}) => {
  const [value, setValue] = useState<JSX.Element | string | number | boolean>(
    isFocus,
  );

  let dContainer: string | undefined;
  let dBox: string | undefined;
  let dFocusBox: string | undefined;
  let dPositionContainer: string | undefined;
  let dContent: string | undefined;

  if (design === 'twoStyles') {
    dContainer = twoStyles.container;
    dBox = twoStyles.box;
    dFocusBox = twoStyles.focusBox;
    dPositionContainer = twoStyles.positionContainer;
    dContent = twoStyles.content;
  } else if (design === 'threeStyles') {
    dContainer = threeStyles.container;
    dBox = threeStyles.box;
    dFocusBox = threeStyles.focusBox;
    dPositionContainer = threeStyles.positionContainer;
    dContent = threeStyles.content;
  } else if (design === 'fourStyles') {
    dContainer = fourStyles.container;
    dBox = fourStyles.box;
    dFocusBox = fourStyles.focusBox;
    dPositionContainer = fourStyles.positionContainer;
    dContent = fourStyles.content;
  } else if (design === 'fiveStyles') {
    dContainer = fiveStyles.container;
    dBox = fiveStyles.box;
    dFocusBox = fiveStyles.focusBox;
    dPositionContainer = fiveStyles.positionContainer;
    dContent = fiveStyles.content;
  } else {
    dContainer = upperStyles.container;
    dBox = upperStyles.box;
    dFocusBox = upperStyles.focusBox;
    dPositionContainer = upperStyles.positionContainer;
    dContent = upperStyles.content;
  }

  const handleBoxClick = (index: number) => {
    boxClick(index);
    setValue(content[index][2]);
  };

  return (
    <div className={dContainer}>
      {content.map((item, index) => (
        <div key={index}>
          <button
            className={item[2] === value ? dFocusBox : dBox}
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

export default SurveyBox;
