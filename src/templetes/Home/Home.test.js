import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img1.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe("<Home />", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    
    const noMorePosts = screen.getByText('Não existem posts =(');
    await waitForElementToBeRemoved(noMorePosts);
    
    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();
    
    const image = screen.getAllByRole('img', { name: /title/i });
    expect(image).toHaveLength(2);
    
    const buton = screen.getByRole('button', { name: /Load more post/i });
    expect(buton).toBeInTheDocument();

    expect(screen.getByRole('heading', {name :'title1 1'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name :'title2 2'})).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name :'title3 3'})).not.toBeInTheDocument();
    
    userEvent.type(search, "title1");

    expect(screen.getByRole('heading', {name :'title1 1'})).toBeInTheDocument();
    expect(screen.queryByRole('heading', {name :'title2 2'})).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', {name :'title3 3'})).not.toBeInTheDocument();
  
    userEvent.clear(search);

    expect(screen.getByRole('heading', {name :'title1 1'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name :'title2 2'})).toBeInTheDocument();
  });
});