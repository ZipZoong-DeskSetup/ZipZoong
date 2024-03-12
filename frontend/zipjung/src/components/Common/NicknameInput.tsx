'use client'
import styles from '@/components/Common/NicknameInput.module.scss'
import useUserInfoStore from '@/stores/userInfo';
import { useState, useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';
import axios from 'axios';

function NicknameInput() {

    const { ZustandNickname, setZustandNickname } = useUserInfoStore();

    const [ischeckNickname, setIscheckNickname] = useState<boolean>(false);

    useEffect(() => {
        const checkNickname = async () => {
            try {
                const response = await axios.get<boolean>(`${process.env.NEXT_PUBLIC_BASE_URL}/nickname/check/${ZustandNickname}`);
                // setIscheckNickname(response.data.isAvailable);
            } catch (error) {
                console.error('닉네임 중복 확인 중 오류 발생', error);
                setIscheckNickname(false);
            }
        };

        checkNickname();
    }, []);

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZustandNickname(event.target.value);
    };
    
    // console.log(ZustandNickname);
    return (
        <div>
            <input
                type="text"
                value={ZustandNickname}
                onChange={handleNicknameChange}
                className={styles.nicknameInput} // 스타일 적용
                placeholder="닉네임 입력" // 사용자가 입력할 때 보이는 플레이스홀더
            />
            {!ZustandNickname ? null : (!ischeckNickname ? <div>이미 사용 중인 닉네임 입니다.</div> : <div>사용 가능한 닉네임 입니다.</div>)}
            
        </div>
    )
}

export default NicknameInput