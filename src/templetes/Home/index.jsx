
import { Component } from 'react';
import { loadPost } from '../../utils/load-post'
import { Post } from '../../components/Post';
import { TextInput } from '../../components/Input';

import './styles.css';
import { Button } from '../../components/Button';

export class Home extends Component {
  state = {
    post: [],
    allPost: [],
    page: 0,
    postPerPage: 2,
    search: ""
  };

  async componentDidMount() {
    await this.loadPost()
  }

  loadPost = async () => {
    const { page, postPerPage } = this.state;
    const postAndPhotos = await loadPost();
    this.setState({ post: postAndPhotos.slice(page, postPerPage), allPost: postAndPhotos });
  }

  loadMorePost = () => {

    const { page, postPerPage, allPost, post } = this.state;
    const nextPage = page + postPerPage;
    const nextPost = allPost.slice(nextPage, nextPage + postPerPage);
    post.push(...nextPost);
    this.setState({ post, page: nextPage });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ search: value });
  }

  render() {
    const { post, page, postPerPage, allPost, search } = this.state;
    const disabled = page + postPerPage >= allPost.length;
    const filterPoste = !!search ? allPost.filter(post => {
      return post.title.toLowerCase().includes(search.toLowerCase())
    }) : post

    return (
      <section className='container'>
        <div className='search-container'>

          {!!search && (

            <h1>Search valor: {search}</h1>

          )}
          <TextInput
            search={search}
            handleChange={this.handleChange}
          />
        </div>
        {filterPoste.length > 0 && (

          <Post posts={filterPoste} />
        )}

        {filterPoste.length === 0 && (
          <h1>Não existem posts =(</h1>
        )}

        <div className='button-container'>
          {!search && (
            <Button
              title="Load more post"
              onClick={this.loadMorePost}
              disabled={disabled}
            />
          )}
        </div>
      </section>
    );
  };
}
