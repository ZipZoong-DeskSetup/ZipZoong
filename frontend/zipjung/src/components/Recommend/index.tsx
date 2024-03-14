'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TiArrowSortedDown } from "react-icons/ti";

import RecommendImgList from "@/components/Common/Recommend/RecommendImgList";
import RecommendList from "@/components/Common/Recommend/RecommendList";
import RecommendPrice from "@/components/Common/Recommend/RecommendPrice";
import RecommendDetailButton from "@/components/Common/Recommend/GoRecommendDetailButton";
import RecommendLikeButton from "@/components/Common/Recommend/RecommendLikeButton";
import ShareButton from "@/components/Common/Recommend/ShareButton";

import useRecommendStore from "@/stores/recommend";
import styles from "@/components/Recommend/index.module.scss"

function Form() {
    const List = [
        {
            id: 1,
            monitor: [{
                id: 1,
                model: '모니터이름',
                detail: '모니터상세',
                img: '/Images/monitor.png',
                price: 10000,
            }],
            keyboard: {
                id: 2,
                model: '키보드이름',
                detail: '키보드상세',
                img: '/Images/keyboard.png',
                price: 10000,
            },
            mouse: {
                id: 3,
                model: '마우스이름',
                detail: '마우스상세',
                img: '/Images/mouse.png',
                price: 10000,
            },
        },
        {
            id: 2,
            monitor: [{
                id: 1,
                model: '모니터이름1',
                detail: '모니터상세',
                img: '/Images/monitor.png',
                price: 10000,
            },
            {
                id: 2,
                model: '모니터이름2',
                detail: '모니터상세',
                img: '/Images/monitor.png',
                price: 10000,
            }],
            keyboard: {
                id: 1,
                model: '키보드이름',
                detail: '키보드상세',
                img: '/Images/keyboard.png',
                price: 10000,
            },
            mouse: {
                id: 2,
                model: '마우스이름',
                detail: '마우스상세',
                img: '/Images/mouse.png',
                price: 10000,
            },
        },

    ]
    const { ZustandRecommendList, ZustandRecommendDetail, setZustandRecommendDetail } = useRecommendStore();
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);


    const router = useRouter()

    const handleDetailClick = (id: number) => {
        // 클라이언트 사이드에서만 실행
        // 선택된 id에 해당하는 item을 찾음
        // TODO: 주석 변경하기
        // const detail = ZustandRecommendList.find(item => item.id === id);
        const detail = List.find(item => item.id === id);

        // 찾은 item을 ZustandRecommendDetail에 저장
        if (detail) {
            setZustandRecommendDetail(detail);
            // 상세 페이지로 이동
        }
        console.log(ZustandRecommendDetail)

        router.push('/recommend/detail')
    };

    const toggleDropdown = (id: number) => {
        if (openDropdownId === id) {
            setOpenDropdownId(null);
        } else {
            setOpenDropdownId(id);
        }
    };

    return (
        <div className={styles.contains}>
            <div>
                {/* TODO: List -> ZustandRecommendList로 변경 */}
                {List.map((item) => [
                    <div className={styles.contain} key={item.id}>
                        <div className={styles.recommendHead}>
                            <div className={styles.recommendId}>추천 {item.id}</div>
                            <div className={styles.shareLike}>
                                <ShareButton />
                                <RecommendLikeButton key={item.id} itemId={item.id} />
                            </div>
                        </div>

                        <div className={styles.ImgPrice}>
                            <div>
                                <RecommendImgList key={item.id} monitorImg={item.monitor[0].img} keyboardImg={item.keyboard.img} mouseImg={item.mouse.img} />
                            </div>
                            <div className={styles.BtnPrice}>
                                <RecommendDetailButton onClick={() => handleDetailClick(item.id)} />
                                <RecommendPrice key={item.id} item={item} />
                            </div>
                        </div>
                        <div className={styles.toggleButton}>
                            <button onClick={() => toggleDropdown(item.id)} id="dropdownButton">
                                <TiArrowSortedDown className={styles.toggleBtn}/>
                            </button>
                        </div>
                        {openDropdownId === item.id && (
                            <div>
                                <RecommendList key={item.id} item={item} />
                            </div>
                        )}
                    </div>
                ])}

            </div>
        </div>
    );
};

export default Form;