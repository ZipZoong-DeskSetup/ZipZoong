/* eslint-disable @next/next/no-img-element */
import twoStyles from '@/components/Survey/SurveyBoxTwo.module.scss';
import threeStyles from '@/components/Survey/SurveyBoxThree.module.scss';
import fourStyles from '@/components/Survey/SurveyBoxFour.module.scss';
import fiveStyles from '@/components/Survey/SurveyBoxFive.module.scss';

const SurveyBox = ({
  content,
  boxClick,
  design,
}: {
  content: (JSX.Element | string | number | boolean)[][];
  boxClick: (index: number) => void;
  design: string;
}) => {
  let dContainer: string | undefined;
  let dBox: string | undefined;
  let dPositionContainer: string | undefined;
  let dContent: string | undefined;

  if (design === 'twoStyles') {
    dContainer = twoStyles.container;
    dBox = twoStyles.box;
    dPositionContainer = twoStyles.positionContainer;
    dContent = twoStyles.content;
  } else if (design === 'threeStyles') {
    dContainer = threeStyles.container;
    dBox = threeStyles.box;
    dPositionContainer = threeStyles.positionContainer;
    dContent = threeStyles.content;
  } else if (design === 'fourStyles') {
    dContainer = fourStyles.container;
    dBox = fourStyles.box;
    dPositionContainer = fourStyles.positionContainer;
    dContent = fourStyles.content;
  } else {
    dContainer = fiveStyles.container;
    dBox = fiveStyles.box;
    dPositionContainer = fiveStyles.positionContainer;
    dContent = fiveStyles.content;
  }

  return (
    <div className={dContainer}>
      {content.map((item, index) => (
        <div key={index}>
          <button className={dBox} onClick={() => boxClick(index)}>
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
