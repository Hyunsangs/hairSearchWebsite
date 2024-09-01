import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Store';
import { fetchRecentSearches, deleteSearch } from '../../Slice/SearchSlice';
import '../../Styles/Record.scss';

const Record: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector((state: RootState) => state.searches);
  
    useEffect(() => {
      dispatch(fetchRecentSearches());
    }, [dispatch]);
  
    const handleDelete = (id: number) => {
      dispatch(deleteSearch(id));
    };

    return (
      <div className='record_container'>
        <h1>최근 검색 기록</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {items && items.length > 0 ? (
          <div className="records_grid">
            {items.map((search, index) => (
              <div key={index} className='record_item'>
                <img src={`http://localhost:8080/uploads/${search.image_path}`} alt="User search result" className="record_image" />
                <div className='record_details'>
                  <p className='hairstyle_name'>헤어스타일: {search.hairstyle}</p>
                  <p className='search_date'>검색일자: {new Date(search.created_at).toLocaleString()}</p>
                  <button onClick={() => handleDelete(search.id)} className="delete_button">삭제</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>최근 검색 기록이 없습니다.</p>
        )}
      </div>
    );
  };
  
  export default Record;
