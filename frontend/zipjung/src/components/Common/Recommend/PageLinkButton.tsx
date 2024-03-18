import { FiSend } from "react-icons/fi";
import styles from '@/components/Common/Recommend/PageLinkButton.module.scss';

interface PageLinkButtonProps {
    itemLink: string;
}

const PageLinkButton: React.FC<PageLinkButtonProps> = ({ itemLink }) => {
    return (
        <button onClick={() => window.location.href = itemLink}><FiSend className={styles.linkBtn}/></button>
    );
}


export default PageLinkButton