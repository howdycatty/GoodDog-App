import React from "react";
import * as blogService from "../../services/blogService";
import { Formik } from "formik";
import * as schemas from "../../models/blogSchemas";
import { Form, Label, Input } from "reactstrap";
import { EditorState, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Tags from "../../components/Blogs/Tags";
import TagsInput from "react-tagsinput";

class BlogEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.validation = schemas.getBlogSchema;

    this.state = {
      blogData: {
        ...this.validation.initialValues,
        editorState: this.editorState,
        tags: []
      },
      tags: []
    };
    this.editorState = new EditorState.createWithContent(
      ContentState.createFromText("")
    );
  }
  onEditorStateChange = editorState => {
    let newBlogData = { ...this.state.blogData };
    newBlogData.editorState = editorState;

    console.log(editorState);
    this.setState({ blogData: newBlogData });
  };

  componentDidMount() {
    console.log("mounted");
    const id = this.props.match.params.id;
    // const id = this.props.location.pathname.split("/")[2];
    console.log("id for edit", id);
    blogService
      .getBlogById(id)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdError);
  }

  onClickDeletePost = () => {
    blogService
      .deleteBlog(this.state.blogData.id)
      .then(this.onDeleteSuccess)
      .catch(this.onDeleteError);
  };

  onDeleteSuccess = response => {
    console.log("Successful blog delete", response);
    this.props.history.push("/blogs/list");
  };
  onDeleteError = response => {
    console.log("error for blog delete", response);
  };

  onUpdateSuccess = response => {
    console.log("successful post to update", response);
    this.props.history.push("/blogs/list");
    // this.props.history.push("/blogs");
  };

  onUpdateError = response => {
    console.log("error post to update", response);
  };

  onGetByIdSuccess = response => {
    console.log(response);
    console.log("blogEfitForm Page: get blog by id success", response);
    let newBlogData = response.item; //this assigns the values of the item to newBlog data

    newBlogData.editorState = EditorState.createWithContent(
      ContentState.createFromText(newBlogData.body)
    );
    newBlogData.tags = response.item.tags.split(",");

    this.setState({
      blogData: newBlogData,
      tags: response.item.tags //this assigns all the received values to blogData
    });
  };

  onGetByIdError = err => {
    console.log("blog edit form page:get blog by id error", err);
  };

  onBlogSubmitted = (values, { setSubmitting }) => {
    console.log("this is the info i want to send", values);
    // this.state.blogData.slug = "sharon";
    // values.slug = cleanTitle(slug.title);
    const id = this.props.location.pathname.split("/")[2];
    let data = { ...values };

    console.log(this.state.tags);
    let mass = [...this.state.tags]; //4
    let tags = "";
    for (let i = 0; i < mass.length; i++) {
      if (i === mass.length - 1) {
        tags = tags + mass[i];
      } else {
        tags = tags + mass[i] + ",";
      }
    }
    data.tags = tags;
    console.log(data);
    blogService
      .submitBlogUpdate(id, data)
      .then(this.onUpdateSuccess)
      .catch(this.onUpdateError)
      .then(() => setSubmitting(false));
  };

  handleChange = tags => {
    this.setState({ tags });
    //, () => {this.state.tags.join(",");}
    // );
    //this.state.tags.join(",");
  };

  // handleChangeInput = tag => {
  //   this.setState({ tag });
  // };

  render() {
    // const str = values.tags;
    return (
      <Formik
        enableReinitialize
        initialValues={this.state.blogData}
        validationSchema={this.validation()}
        onSubmit={this.onBlogSubmitted}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;

          return (
            <div className="content-wrapper">
              <div className="content-heading">Edit Blog Entry</div>
              <div className="row">
                <div className="col-xl-9">
                  <div className="card card-default">
                    <div className="card-body">
                      <Form
                        action="#"
                        className="blogToUpdate"
                        onSubmit={handleSubmit}
                      >
                        <div className="form-group">
                          <p>Title</p>
                          <Input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Blog title..."
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.title && touched.title ? "error" : ""
                            }
                          />{" "}
                          {errors.title && touched.title && (
                            <label className="error">{errors.title}</label>
                          )}{" "}
                        </div>
                        <div>
                          <div className="form-group">
                            <p>Author</p>
                            <Input
                              id="author"
                              type="text"
                              name="author"
                              placeholder="Author..."
                              value={values.author}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.author && touched.author ? "error" : ""
                              }
                            />{" "}
                            {errors.author && touched.author && (
                              <label className="error">{errors.author}</label>
                            )}{" "}
                          </div>
                          <p>Body</p>
                          <Input
                            id="body"
                            required
                            type="textarea"
                            // style="margin-top: 0px; margin-bottom: 0px; height: 197px;"
                            // className="form-control wysiwyg mt-3"
                            name="body"
                            placeholder="Type new entry ..."
                            // defaultValue={this.state.body}
                            value={values.body}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.body && touched.body ? "error" : ""
                            }
                            style={{
                              overflow: "scroll",
                              height: "250px",
                              maxHeight: "250px"
                            }}
                          />
                          {errors.body && touched.body && (
                            <label className="error">{errors.body}</label>
                          )}{" "}
                        </div>{" "}
                        <br />
                        <div className="form-group">
                          <p>Tags</p>
                          <TagsInput
                            tags="tags"
                            type="text"
                            value={this.state.tags}
                            onChange={this.handleChange.bind(this)}
                          />
                          {errors.tags && touched.tags && (
                            <label className="error">{errors.tags}</label>
                          )}{" "}
                        </div>
                        {/* <Tags /> */}
                        <div className="form-group">
                          <p>Image Link</p>
                          <Input
                            id="photoUrl"
                            // className="form-control"
                            type="text"
                            placeholder="Enter Photo Url.."
                            name="photoUrl"
                            value={values.photoUrl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.photoUrl && touched.photoUrl ? "error" : ""
                            }
                          />
                          {errors.photoUrl && touched.photoUrl && (
                            <label className="error">{errors.photoUrl}</label>
                          )}{" "}
                        </div>
                        <div className="form-group">
                          <p>Slug</p>
                          <Input
                            id="slug"
                            type="text"
                            placeholder="Enter Slug.."
                            name="slug"
                            // readOnly
                            // value={this.state.blogData.slug}
                            value={values.slug} //these three replace the top commented out to do read only
                            onChange={handleChange} //
                            onBlur={handleBlur} //
                            className={
                              errors.slug && touched.slug ? "error" : ""
                            }
                          />
                          {errors.slug && touched.slug && (
                            <label className="error">{errors.slug}</label>
                          )}{" "}
                        </div>
                        <div className="form-group">
                          <Label for="dateStart">Date To Publish</Label>
                          <div className="form-group">
                            <Input
                              id="dateToPublish"
                              type="date"
                              // selected={values.dateToPublish}
                              // onChange={this.onDateChanged}
                              selected={values.dateToPublish}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.dateToPublish && touched.dateToPublish
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            {errors.dateToPublish && touched.dateToPublish && (
                              <label className="error">
                                {errors.dateToPublish}
                              </label>
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <p>Draft Version</p>
                          <Input
                            id="statusId"
                            type="text"
                            placeholder="Enter version number"
                            name="statusId"
                            value={values.statusId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.statusId && touched.statusId ? "error" : ""
                            }
                          />
                          {errors.statusId && touched.statusId && (
                            <label className="error">{errors.statusId}</label>
                          )}{" "}
                        </div>
                        <br />
                        <div className="clearfix">
                          <div className="float-left">
                            {/* <button className="btn btn-secondary" type="button">
                              <em className="fa fa-edit fa-fw" />
                              Draft
                            </button> */}

                            <button
                              className="btn btn-primary"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              <em className="fa fa-check fa-fw" />
                              Publish Update
                            </button>
                          </div>
                          <div className="float-right">
                            <button
                              className="btn btn-danger"
                              type="button"
                              onClick={this.onClickDeletePost}
                            >
                              <em className="fas fa-trash-alt fa-fw" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    );
  }
}

export default BlogEditForm;
