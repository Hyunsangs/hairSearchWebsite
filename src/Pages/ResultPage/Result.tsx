import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPlaces } from '../../Slice/PlaceSlice';
import '../../Styles/Result.scss';

const Result: React.FC = () => {
  const { imageUrl, analysisResult } = useSelector((state: RootState) => state.imagePreview);
  const { items, loading, error } = useSelector((state: RootState) => state.places);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (analysisResult) {
      
      dispatch(fetchPlaces({ hairstyle: analysisResult.hairstyle, region: analysisResult.region }));
    }
  }, [analysisResult, dispatch]);

  const backHandler = () => {
    navigate('/');
  };

  return (
    <div className='result_container'>
      <div className='main_grid'>
        <div className='side_container'>
          <div className='title'>헤어 스타일에 맞는 미용실은?</div>
          <div className='side_box'>
            <div className='user_picture'>
              {imageUrl ? (
                <img src={imageUrl} alt='사용자가 넣은 사진' />
              ) : (
                <div>이미지를 로드할 수 없습니다.</div>
              )}
            </div>
            <div className='user_title'>
              헤어스타일 종류
            </div>
            <div className='user_result'>
              {analysisResult ? analysisResult.hairstyle : '결과가 없습니다'}
            </div>
          </div>  
          <button onClick={backHandler} className='back_button'>처음으로</button>
        </div>
        
        <div className='main_box'>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {items && items.length > 0 ? (
            items.map((place, index) => (
              <div key={index} className='place_item'>
                <h4>{place.title}</h4>
                <p>{place.address}</p>
                <p>{place.category}</p>
                <Link to={place.link} target="_blank" rel="noopener noreferrer">링크</Link>
              </div>
            ))
          ) : (
            <p>결과가 없습니다</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
