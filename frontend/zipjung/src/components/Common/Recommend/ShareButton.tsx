import { RiShareLine } from "react-icons/ri";
import styles from '@/components/Common/Recommend/ShareButton.module.scss';


function ShareButton() {
    return(
        <button><RiShareLine className={styles.shareBtn}/></button>
    );
};

export default ShareButton;