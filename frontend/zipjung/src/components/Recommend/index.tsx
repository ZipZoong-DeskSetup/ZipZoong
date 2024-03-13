'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RecommendImgList from "@/components/Common/Recommend/RecommendImgList";
import RecommendList from "@/components/Common/Recommend/RecommendList";
import RecommendPrice from "@/components/Common/Recommend/RecommendPrice";
import RecommendDetailButton from "@/components/Common/Recommend/GoRecommendDetailButton";
import useRecommendStore from "@/stores/recommend";
import styles from "@/components/Recommend/index.module.scss"

function Form() {
    const List = [
        {
            id: 1,
            monitor: [{
                model: '모니터이름',
                detail: '모니터상세',
                img: '/Images/monitor.png',
                price: 10000,
            }],
            keyboard: {
                model: '키보드이름',
                detail: '키보드상세',
                img: '/Images/keyboard.png',
                price: 10000,
            },
            mouse: {
                model: '마우스이름',
                detail: '마우스상세',
                img: '/Images/mouse.png',
                price: 10000,
            },
        },
        {
            id: 2,
            monitor: [{
                model: '모니터이름1',
                detail: '모니터상세',
                img: '/Images/monitor.png',
                price: 10000,
            },
            {
                model: '모니터이름2',
                detail: '모니터상세',
                img: '/Images/monitor.png',
                price: 10000,
            }],
            keyboard: {
                model: '키보드이름',
                detail: '키보드상세',
                img: '/Images/keyboard.png',
                price: 10000,
            },
            mouse: {
                model: '마우스이름',
                detail: '마우스상세',
                img: '/Images/mouse.png',
                price: 10000,
            },
        },

    ]
    const { ZustandRecommendList, ZustandRecommendDetail, setZustandRecommendDetail } = useRecommendStore();

    const router = useRouter()

    const handleDetailClick = (id: number) => {
        // 클라이언트 사이드에서만 실행
        // 선택된 id에 해당하는 item을 찾음
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


    return (
        <div className={styles.contains}>
            <div>
                {/* {ZustandRecommendList.map(({ id, monitor, keyboard, mouse }) =>
                    <RecommendImgList key={id} monitorImg={monitor.img} keyboardImg={keyboard.img} mouseImg={mouse.img}/>
                )} */}
                {List.map((item) => [
                    <div className={styles.contain}>
                        <div className={styles.recommendId}>추천 {item.id}</div>
                        <div className={styles.ImgPrice}>
                            <div>
                                <RecommendImgList key={item.id} monitorImg={item.monitor[0].img} keyboardImg={item.keyboard.img} mouseImg={item.mouse.img} />
                            </div>
                            <div className={styles.BtnPrice}>
                                <div>
                                    <RecommendDetailButton onClick={() => handleDetailClick(item.id)} />
                                </div>
                                <div>
                                    <RecommendPrice key={item.id} item={item} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <RecommendList key={item.id} item={item} />
                        </div>
                    </div>
                ])}

            </div>
        </div>
    );
};

export default Form;