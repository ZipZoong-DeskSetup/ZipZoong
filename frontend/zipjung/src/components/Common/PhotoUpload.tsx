// 'use client';
/* eslint-disable @next/next/no-img-element */

// import Image from 'next/image';
import {useState, useRef} from 'react';
// import {BiBorderRadius} from 'react-icons/bi';
import styles from '@/components/Common/PhotoUpload.module.scss';

function PhotoUpload({
  setFirstImg,
}: {
  setFirstImg: React.Dispatch<React.SetStateAction<string>>;
}) {
  // selectedFile의 타입을 File | null로 변경
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // event.target.files가 null이 아닌 경우에만 파일을 설정
  //   if (event.target.files && event.target.files.length > 0) {
  //     setSelectedFile(event.target.files[0]);
  //   }
  // };

  // console.log(selectedFile);

  const [imgFile, setImgFile] = useState<string | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    if (imgRef.current && imgRef.current.files && imgRef.current.files[0]) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImgFile(reader.result);
          setFirstImg(reader.result);
        }
      };
    }
  };

  return (
    <div className={styles.photoUpload}>
      <input
        type="file"
        accept="image/*"
        id="profileImg"
        onChange={saveImgFile}
        ref={imgRef}
        hidden
      />
      <label className={styles.profileUploadLabel} htmlFor="profileImg">
        <img
          src={imgFile || `/images/profileImg.png`}
          alt="프로필 이미지"
          className={styles.profileUploadImg}
        />
      </label>
    </div>
  );
}

export default PhotoUpload;
