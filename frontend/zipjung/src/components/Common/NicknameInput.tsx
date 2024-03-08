'use client'
import styles from '@/components/Common/NicknameInput.module.scss'
import useUserInfoStore from '@/stores/userInfo';

function NicknameInput() {
    //TODO: 인덱스에서 zustand연결하기 & 서버 연결까지 합시다~!!!

    const {ZustandNickname, setZustandNickname}  = useUserInfoStore();

    return (
        <div>
            <input type="text" value=""/>
        </div>
    )
}

export default NicknameInput