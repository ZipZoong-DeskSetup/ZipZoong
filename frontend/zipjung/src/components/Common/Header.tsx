'use client';
import { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { IoIosArrowDown } from "react-icons/io";
import styles from '@/components/Common/Header.module.scss';

function Header() {
    const [isLogin, setIsLogin] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const userName = "라벤더";

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className={styles.Header}>
            <div className={styles.Logo}>
                <Image
                    src="/images/zipjung_logo.png"
                    width={70}
                    height={40}
                    alt='zipjung_logo'
                />
                <span>집중</span>
            </div>

            <div className={styles.Navbar}>

                <a href="./survey">추천</a> 

                <a href="./board">게시판</a> 

                {isLogin ?
                    <div className={styles.Logout}>
                        <div >
                            <a href="./mypage">{userName} 님</a>
                            <button onClick={toggleDropdown} id="dropdownButton">
                                <IoIosArrowDown />
                            </button>
                        </div>
                        <div className={styles.LogoutToggle}>
                            {isDropdownOpen && (
                                <div className={styles.LogoutToggleContents}>
                                    <button onClick={() => setIsLogin(false)}>로그아웃</button>
                                </div>
                                )}
                        </div>
                    </div>
                    : <a href="./user/login">로그인</a>}
                <Image
                    src="/Images/person.png"
                    width={40}
                    height={40}
                    alt="user_img"
                />
            </div>
        </div>
    )
}

export default Header;