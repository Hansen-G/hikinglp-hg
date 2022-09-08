import './ImageCard.css'
function ImageCard (image){
    return (
        <a href={image.image.url} target="_blank" rel="noreferrer">
        <div className="image-card flex">
           
                <div className='image-card-div'>
                    <img 
                    src={image.image.url} 
                    className='image-card-image' 
                    onError={e => { e.currentTarget.src = "https://res.cloudinary.com/hansenguo/image/upload/v1661959406/Hikinglp/Logo_sytg4b.png"; }}
                    />
                </div>
                
              
                <div className='image-card-info Poppins'>
                    <div className='image-card-title '>{image.image.title}</div>
                    
                    <div className='image-card-altText'>{image.image.altText} </div>
                    <div className='image-card-credit'>Photo by {image.image.credit}</div>
                </div>

        </div>
        </a>
    )
}

export default ImageCard;