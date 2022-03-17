
import './styles.css'
export const PostCard = ({ cover, title, id, body }) => (
    <div className='post'>
        <img src={cover} alt={title}></img>
        <div className="post-content">
            <h1>{title} {id}</h1>
            <p>{body}</p>
        </div>
    </div>
);