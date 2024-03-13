'use client'

import RecommendImgList from "@/components/Recommend/RecommendImgList";
import RecommendList from "@/components/Recommend/RecommendList";
import useRecommendStore from "@/stores/recommend";
import styles from "@/components/Recommend/index.module.scss"

function Form() {
    const { ZustandRecommend } = useRecommendStore();

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

    return (
        <div className={styles.contains}>
            <div>
                {/* {ZustandRecommend.map(({ id, monitor, keyboard, mouse }) =>
                    <RecommendImgList key={id} monitorImg={monitor.img} keyboardImg={keyboard.img} mouseImg={mouse.img}/>
                )} */}
                {List.map((item) => [
                    <div className={styles.contain}>
                        <div className={styles.recommendId}>추천 {item.id}</div>
                        <div>
                            <RecommendImgList key={item.id} monitorImg={item.monitor[0].img} keyboardImg={item.keyboard.img} mouseImg={item.mouse.img} />
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