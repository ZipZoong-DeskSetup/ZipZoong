import {FiSend} from 'react-icons/fi';
import styles from '@/components/Common/Recommend/PageLinkButton.module.scss';

interface PageLinkButtonProps {
  itemLink: string;
}

const PageLinkButton: React.FC<PageLinkButtonProps> = ({itemLink}) => {
  const handleClick = () => {
    window.location.href = itemLink;
  };

  return (
    <button onClick={handleClick}>
      <FiSend className={styles.linkBtn} />
    </button>
  );
};

export default PageLinkButton;
