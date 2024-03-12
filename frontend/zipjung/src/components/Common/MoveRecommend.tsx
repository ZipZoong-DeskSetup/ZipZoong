import Link from 'next/link'
import styles from '@/components/Common/MoveRecommend.module.scss';

function MoveRecommend({detail, address, styleName}: {detail: string, address: string, styleName: string}) {
    return (
        <a href = {address}><button className={styles[styleName]}>{detail}</button></a>
    )
}

export default MoveRecommend;