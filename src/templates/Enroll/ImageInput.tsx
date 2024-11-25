import { Flex } from '@/components/commons/Flex';
import { HeightInNumber } from '@/components/types';

import { useState } from 'react';

import styled from '@emotion/styled';

const ImageContainer = styled.div<HeightInNumber>`
  height: ${(props) => props.h}px;
  width: 200px;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border: 1px solid #c2c5fb;
  border-radius: 20px;
  background: #fff;
  box-sizing: border-box;
  justify-content: center;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const PlaceholderText = styled.span`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.28px;
  color: #cccccc;
  display: grid;
  place-items: center;
`;

const SideContainer = styled.div<HeightInNumber>`
  height: ${(props) => props.h}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const InfoText = styled.p`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: -0.28px;
  color: #cccccc;
`;

const AttachImageButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 111px;
  height: 30px;
  padding: 5px 14px;
  border-radius: 5px;
  background: #8488ec;
  color: white;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  margin-top: 4px;

  input {
    display: none;
  }
`;

const ImageRestrictionNotice = () => (
  <InfoText>
    JPG, PNG
    <br />
    10MB 용량 제한
    <br />
    500x500 px 사이즈 권장
  </InfoText>
);

const isValidFileType = (file: File) => {
  const allowedTypes = ['image/png', 'image/jpeg'];
  return allowedTypes.includes(file.type);
};

export const ImageInput = () => {
  const [image, setImage] = useState<string | null>(null);

  const processFile = (file: File) => {
    if (!isValidFileType(file)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    e.preventDefault();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  return (
    <Flex gap={'17px'}>
      <ImageContainer h={200} onDragOver={handleDragOver} onDrop={handleDrop}>
        {image && <PreviewImage src={image} alt="Uploaded preview" />}
        {!image && <PlaceholderText>이미지를 드래그하세요</PlaceholderText>}
      </ImageContainer>
      <SideContainer h={200}>
        <ImageRestrictionNotice />
        <AttachImageButton>
          이미지 업로드
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
        </AttachImageButton>
      </SideContainer>
    </Flex>
  );
};
