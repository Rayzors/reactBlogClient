import React, { useContext, useState } from 'react';
import { PostContext } from '../store/postProvider';
import Popin from '../components/Popin/Popin';
import PostForm from '../components/Form/PostForm';
import styled from 'styled-components';
import { Title, SubTitle } from '../styled-components/Title';
import { Table } from '../styled-components/Table';
import { Button } from '../styled-components/Button';
import moment from 'moment';

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2em;
`;

function AdminHome() {
  const { pages, posts, deletePost } = useContext(PostContext);
  const [isOpen, setPopinState] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postType, setPostType] = useState('');

  function toggle({ post, type }) {
    setPopinState(!isOpen);
    if (!isOpen && post) {
      setCurrentPost(post);
      setPostType(type);
    } else if (!isOpen && type) {
      setPostType(type);
    } else {
      setCurrentPost(null);
    }
  }

  return (
    <>
      <Title>Administration</Title>
      <TwoColumns>
        <div>
          <SubTitle>Pages</SubTitle>
          <Button onClick={() => toggle({ type: 'page' })}>
            + Ajouter une page
          </Button>
          <Table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page._id}>
                  <td>{page.title}</td>
                  <td>{moment(page.date).format('DD MMMM YYYY')}</td>
                  <td>
                    <button
                      onClick={() => toggle({ post: page, type: 'page' })}
                    >
                      Editer
                    </button>
                    <button onClick={() => deletePost(page._id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div>
          <SubTitle>Articles</SubTitle>
          <Button onClick={() => toggle({ type: 'post' })}>
            + Ajouter un article
          </Button>
          <Table>
            <thead>
              <tr>
                <th>Titre</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{moment(post.date).format('DD MMMM YYYY')}</td>
                  <td>
                    <button onClick={() => toggle({ post, type: 'post' })}>
                      Editer
                    </button>
                    <button onClick={() => deletePost(post._id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </TwoColumns>
      <Popin isOpen={isOpen} toggle={toggle}>
        <PostForm post={currentPost} postType={postType} />
      </Popin>
    </>
  );
}

export default AdminHome;
