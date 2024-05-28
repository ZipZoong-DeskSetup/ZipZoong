import {AiOutlineClose} from 'react-icons/ai';
import Image from 'next/image';
import styles from '@/components/MyPage/Modal/ChangeCheckModal.module.scss';

const ChangeCheckModal = ({
  contents,
  isOpen,
  onClose,
  ModalImg,
}: {
  contents: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  ModalImg: string;
}) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.Header}>
          <AiOutlineClose onClick={onClose} />
        </div>
        <div className={styles.Body}>
          <div className={styles.content}>
            <div className={styles.modalImg}>
              <Image src={ModalImg} alt="모달이미지" width={24} height={24} />
            </div>
            {contents}
          </div>
        </div>
      </div>
      <div className={styles.shadow} onClick={onClose} />
    </div>
  );
};

export default ChangeCheckModal;
