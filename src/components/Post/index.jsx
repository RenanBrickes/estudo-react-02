import { PostCard } from '../PostCard/index';
import './styles.css';
export const Post = ({posts}) => {
    return (<div className="posts">
        {posts.map(post =>
            <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                cover={post.cover}
                body={post.body}
            />
        )}
    </div>);
}