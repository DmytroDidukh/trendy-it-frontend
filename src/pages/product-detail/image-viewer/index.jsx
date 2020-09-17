import React, {useState} from 'react';
import ImgsViewer from 'react-images-viewer';

const ImageViewer = ({images}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currImg, setCurrImg] = useState(0);

    const imagesSet = images.map( img => ({src: img.link}))

    const openImage = (idx) => {
        setIsOpen(true);
        setCurrImg(idx);
    };

    const primaryImage = (
        <div style={{background: `url(${images[0].link}) no-repeat center center`, backgroundSize: "cover"}} onClick={() => openImage(0)}/>
    )

    const sideImages = (
        images.slice(1).map((img, idx) => (
            <div
                style={{background: `url(${img.link}) no-repeat center center`, backgroundSize: "cover"}}
                key={idx}
                onClick={() => openImage(idx + 1)}
            />
        )))

    return (
        <>
            <ImgsViewer
                imgs={imagesSet}
                currImg={currImg}
                showThumbnails
                isOpen={isOpen}
                onClickPrev={() => setCurrImg((currImg) => currImg - 1)}
                onClickNext={() => setCurrImg((currImg) => currImg + 1)}
                onClickThumbnail={(index) => setCurrImg(index)}
                onClose={() => setIsOpen(false)}
                closeBtnTitle={'Закрити'}
                leftArrowTitle={'Назад'}
                rightArrowTitle={'Вперед'}
            />
            <div className='product-detail__item__images'>
                {primaryImage}
                {sideImages}
            </div>
        </>
    );
};

export default ImageViewer;
