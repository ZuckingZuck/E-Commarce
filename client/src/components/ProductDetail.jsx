import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', content: '' });

  const product = {
    brand: 'Your Brand',
    productName: 'Your Product',
    productImage: 'https://example.com/product-image.jpg',
    stock: 10,
    topCategory: 'Electronics',
    subCategory: 'Smartphones',
    price: 299.99,
    star: 4.5,
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, newComment]);
    setNewComment({ name: '', content: '' });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Image src={product.productImage} alt={product.productName} fluid />
        </Col>
        <Col md={8}>
          <h2>{product.productName}</h2>
          <p className="text-muted">{product.brand}</p>
          <p>
            {product.topCategory}/{product.subCategory}
          </p>
          <p className={product.stock > 0 ? 'text-success' : 'text-danger'}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <p className="font-weight-bold">${product.price}</p>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faStar} className="text-warning mr-1" />
            <span className="text-warning">{product.star} Stars</span>
          </div>
          <div className="mt-4">
            <h5>Comments</h5>
            <ul className="list-unstyled">
              {comments.map((comment, index) => (
                <li key={index}>
                  <strong>{comment.name}</strong>: {comment.content}
                </li>
              ))}
            </ul>
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={newComment.name}
                  onChange={handleCommentChange}
                />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your comment"
                  name="content"
                  value={newComment.content}
                  onChange={handleCommentChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
