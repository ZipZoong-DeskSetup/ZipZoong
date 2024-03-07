import Link from 'next/link'

const MoveRecommend = ({detail, address}: {detail: string, address: string}) => {
    // const address: string = "/recommend";
    // const detail: string = "설명";


    return(<Link href = {address}><button>{detail}</button></Link>);
}

export default MoveRecommend;