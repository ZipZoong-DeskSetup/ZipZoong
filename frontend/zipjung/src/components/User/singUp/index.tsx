import Image from "next/image";
import PhotoUpload from '@/components/Common/PhotoUpload';
import NicknameInput from '@/components/Common/NicknameInput';
import MoveRecommend from "@/components/Common/MoveRecommend";
import styles from '@/components/User/singUp/index.module.scss'

function Form() {
    const address: string = '/';
    const detail: string = '시작하기';
    const styleName: string = 'signUp';

    return (
        <div className={styles.signUp}>
            <a href="/">
                <Image
                    src="/images/zipjung_logo.png"
                    width={150}
                    height={80}
                    alt='zipjung_logo'
                    className={styles.logo}
                />
            </a>
            <div className={styles.signUpTitle}>사용하실 닉네임을 입력해주세요.</div>
            <PhotoUpload />
            <NicknameInput />
            <MoveRecommend address={address} detail={detail} styleName={styleName} />
        </div>
    )
}

export default Form