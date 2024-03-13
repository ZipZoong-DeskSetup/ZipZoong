import Image from "next/image";
import styles from '@/components/Common/Recommend/RecommendImgList.module.scss'

function RecommendImgList ({monitorImg, keyboardImg, mouseImg} : {monitorImg:string, keyboardImg:string, mouseImg:string}) {
    
    return (
        <div className={styles.imgList}>
            <Image 
                src={monitorImg}
                width={120}
                height={120}
                alt="모니터이미지"
                className={styles.productImg}
            />
            <Image 
                src={keyboardImg}
                width={120}
                height={120}
                alt="키보드이미지"
                className={styles.productImg}
            />
            <Image 
                src={mouseImg}
                width={120}
                height={120}
                alt="마우스이미지"
                className={styles.productImg}
            />
        </div>
    );
};

export default RecommendImgList;