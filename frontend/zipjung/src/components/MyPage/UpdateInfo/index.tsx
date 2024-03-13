'use client'
import ChangeCheckModal from "@/components/MyPage/Modal/ChangeCheckModal";
import {useState} from 'react';

const UpdateForm = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    //TODO: 중복된 닉네임 클릭 시 중복된 닉네임입니다., 이미지 바꾸기
    // let contents: JSX.Element = <>닉네임이 변경되었습니다.</>;
    // let ModalImg: string = "/Images/CheckRight.png"
    let contents: JSX.Element = (<>이미 사용중인 닉네임입니다.<br/>다른 닉네임을 입력하세요</>);
    let ModalImg: string = "/Images/CheckWrong.png"


    const handleOpenModal = () => {
        console.log("열기 클릭");
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        console.log("닫기 클릭");
        setIsModalOpen(false);
    }

    return(
        <>
            <button onClick = {handleOpenModal}>
                모달 열기
            </button>
            <ChangeCheckModal contents = {contents} isOpen={isModalOpen} onClose={handleCloseModal} ModalImg = {ModalImg}/>
        </>
    )
}
export default UpdateForm;