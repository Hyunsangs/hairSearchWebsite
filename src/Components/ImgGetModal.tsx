import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store';
import { setImageUrl, startAnalysis, setAnalysisResult, resetImageUrl } from '../Slice/imagePreviewSlice';
import Loading from './Loading';
import '../Styles/ImgGetModal.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ImgGetModalProps {
  closeModal: () => void;
}

const ImgGetModal: React.FC<ImgGetModalProps> = ({ closeModal }) => {
  const [file, setFile] = useState<File | null>(null);
  const [region, setRegion] = useState<string>('');
  const navigate = useNavigate();
  const { imageUrl, isLoading, analysisResult } = useSelector((state: RootState) => state.imagePreview);
  const dispatch = useDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setImageUrl(reader.result as string)); // Base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
  };

  const startAnalysisHandler = async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      console.error('로그인 필요: 클라이언트에서 사용자 정보 없음');
      return;
    }
    if (!file) {
        return;
    }
    dispatch(startAnalysis());

    const formData = new FormData();
    formData.append('image', file);
    formData.append('region', region); // 지역 정보 추가

    try {
        const response = await axios.post('http://localhost:8080/salon/analyze', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true, // 세션 정보를 포함하여 요청
        });
        console.log(response.data);
        dispatch(setAnalysisResult({...response.data , region}));
    } catch (error) {
        console.error('분석 요청 실패:', error);
        dispatch(setAnalysisResult({ hairstyle: '분석 중 에러가 발생했습니다.', region }));
    }
  };

  const resetImage = () => {
    dispatch(resetImageUrl());
  };

  const searchHandler = () => {
    navigate('/result');
  };

  return (
    <div className="modal_container">
      <div className='modal_backdrop' onClick={closeModal}>
        <div className='modal_view' onClick={e => e.stopPropagation()}>
          <h1>사진을 선택해주세요</h1>
          {!imageUrl && !isLoading && (
            <>
              <label htmlFor="file-upload" className="custom-file-upload">
                이미지 업로드
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <input
                className='input_local'
                type="text"
                placeholder="지역을 입력하세요"
                value={region}
                onChange={handleRegionChange}
              />
            </>
          )}
          {imageUrl && (
            <>
              {!isLoading && <img src={imageUrl} alt="Preview" />}
              {isLoading && <Loading />}
              {analysisResult ? (
                <div className='result_container'>
                  <div className='result_display'>{analysisResult.hairstyle}</div>
                  <div className='button_box'>
                    <button className='reset_button' onClick={resetImage}>다시 선택</button>
                    <button className='search_button' onClick={searchHandler}>미용실 찾기</button>
                  </div>
                </div>
              ) : (
                <div className='button_box'>
                  <button className='reset_button' onClick={resetImage}>다시 선택</button>
                  <button className='analysis_button' onClick={startAnalysisHandler}>분석 시작</button>
                </div>
              )}
            </>
          )}
          <button className='close_button' onClick={closeModal}>X</button>
        </div>
      </div>
    </div>
  );
};

export default ImgGetModal;
