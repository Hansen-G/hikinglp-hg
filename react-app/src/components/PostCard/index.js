import './PostCard.css';
import { Link } from 'react-router-dom';

import { pastDate } from "./../../util";
import EditPostModal from "../EditPostModal";
import { useSelector } from "react-redux";

const PostCard = ({ post, HomePage }) => {
    const user = useSelector((state) => state.session.user);


    return (
        
            <div className='loc-post-card' id='home-post-card'>
                <div className='loc-post-card-user flex'>
                    <div className='user-img-div'>
                        <img src={post.user.profile_img} alt={post.user.name} className='user-img' />
                    </div>
                    <div className='user-info'>
                        <div className='user-name'>{post.user.name}</div>
                    </div>

                    {user && user.id === post.user_id && (
                        <EditPostModal post={post} />
                    )}

                </div>
                <div className='loc-post-card-time'>
                    <div>{pastDate(post.createdAt)}</div>
                </div>

                <div className='loc-post-card-post'>
                    <div>{post.post}</div>
                </div>
                {HomePage ? (
                    <Link to={`/locations/${post.location_id}`}>
                        <div className='loc-post-card-img'>
                            <img src={post.preview_img} alt={post.post} className='post-img' />
                        </div>
                    </Link>
                ): (
                  
                    <div className='loc-post-card-img'>
                        <img src={post.preview_img} alt={post.post} className='post-img' />
                    </div>
                  

                )}
               
            </div>
       
    )
}

export default PostCard;