import '../Styles/Loading.scss'

const Loading = () => {

    return (
        <>
            <div className="loading_text">분석중..</div>
            <img className='loading_image' src="../img/CircleLoading.gif" alt="loading" />
        </>
    );
}

export default Loading;