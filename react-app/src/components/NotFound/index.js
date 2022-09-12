import './NotFound.css'

import {Link} from 'react-router-dom';



function NotFound () {
    return (
        <div className='not-found flex'>
            <div className='not-found-text'>
                <h2>We’re sorry. We can’t find the page you’re looking for.</h2>
                <h3>
                    <Link to='/'>Return to the homepage</Link>
                </h3>
            </div>

            <div className='not-found-imag-div'>
                <img src='https://res.cloudinary.com/hansenguo/image/upload/v1662953991/Hikinglp/WX20220911-233758_2x_ygpsmu.png' alt='404' className='not-found-img'/>
            </div>
        </div>

    )
}

export default NotFound;