import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  Col,
  Row,
  Container,
  ButtonGroup,
} from "react-bootstrap";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { blogActions } from "../../redux/actions/blog.actions";

const AddEditBlogPage = () => {
  //Local state: store user's input
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    images: '',
  })

  //Global state: get from redux store (attribute blog)
  const loading = useSelector((state) => state.blog.loading);
  const selectedBlog = useSelector((state) => state.blog.selectedBlog);
  const redirectTo = useSelector((state) => state.blog.redirectTo);

  //Dispatch to send action to redux reducer
  const dispatch = useDispatch();

  //History to redirect to next or previous page
  const history = useHistory();

  //Params to parse the url
  const params = useParams();
  const addOrEdit = params.id ? "Edit" : "Add";

  // console.log(selectedBlog)

  // Update loval state when a specific blog is changed or action (edit or add) is changed
  useEffect(() => {
    if (addOrEdit === 'Edit') {
      setFormData((formData) => ({
        ...formData, 
        title: selectedBlog.title, 
        content: selectedBlog.content,
        images: selectedBlog.images,
      }))
    }
  }, [addOrEdit, selectedBlog]);

  //Update user's input when user is typing
  const handleChange = (e) => {
    if (e.target.name === 'images'){
      setFormData({...formData, [e.target.name]: e.target.files})
    }else{
    setFormData({...formData, [e.target.name]: e.target.value})
    }
  }
  
  //Function to call Middleware and then send action to redux reducer
  const handleSubmit = (e) => {
    //Prevent the page from reloading
    e.preventDefault();

    //Get user's input
    const {title, content, images} = formData
    console.log(images)

    //Call Middleware and then send action to redux reducers
    if (addOrEdit === 'Add'){
      dispatch(blogActions.createNewBlog(title, content, images))
    }else{
      dispatch(blogActions.updateBlog(selectedBlog._id, title, content, images))
    }
  };

  //Function to go back a previous page
  const handleCancel = () => {
    history.goBack();
  };

  //Function to delete a blog
  const handleDelete = () => {
    dispatch(blogActions.deleteBlog(selectedBlog._id))
  }

  if (redirectTo) return <Redirect to={redirectTo}></Redirect>

return (
  <div>
    <Container className="position-blogadd">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-primary">{addOrEdit} blog</h1>
              <p className="lead">
                <i className="fas fa-user" />
              </p>
            </div>
            <Form.Group>
              <Form.Control type="text" required placeholder="Title" name="title" value={formData.title}onChange={handleChange}/>
            </Form.Group>
            
            <Form.Group>
              <Form.Control as="textarea" rows="10" placeholder="Content" name="content" value={formData.content} onChange={handleChange}/>
            </Form.Group>

            {<Form.Group>
              <Form.Control type='file' multiple accept='image/png image/jpeg image/jpg' name="images" onChange={handleChange} />
            </Form.Group>}

            <ButtonGroup className="d-flex mb-3">
              {loading ? (
                <Button className="mr-3" variant="primary" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Submitting...
                </Button>
              ) : (
                  <Button className="mr-3" type="submit" variant="primary">Post</Button>
                )}
              <Button variant="light" onClick={handleCancel} disabled={loading}>Cancel</Button>
            </ButtonGroup>

            {addOrEdit === "Edit" && (
              <ButtonGroup className="d-flex">
                <Button variant="danger" onClick={handleDelete} disabled={loading}>Delete Blog</Button>
                {addOrEdit === "Edit" && (
                  <ButtonGroup className="d-flex">
                    <Button variant="danger" onClick={handleDelete} disabled={loading}>Delete Blog</Button>
                  </ButtonGroup>
                )}
              </ButtonGroup>

            )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddEditBlogPage;
