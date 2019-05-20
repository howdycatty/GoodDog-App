import React from "react";
import * as blogService from "../../services/blogService";
import { Formik } from "formik";
import * as schemas from "../../models/blogSchemas";
import { Form, Input, Label, FormGroup } from "reactstrap";
import Tags from "../../components/Blogs/Tags";
import TagsInput from "react-tagsinput";

class BlogCreate extends React.Component {
  constructor(props) {
    super(props);
    this.validation = schemas.getBlogSchema;
    this.state = {
      blogData: this.validation.initialValues,
      tags: []
      // tag: ""
    };
    this.onBlogSubmitted = this.onBlogSubmitted.bind(this);
  }

  handleChange(tags) {
    this.setState({ tags }, () => {
      this.state.tags.join(",");
      console.log(this.state.tags);
      console.log("does this actually work????", this.state.tags.join(","));
    });
  }

  onSubmitSuccess = payload => {
    console.log("successful post to publish", payload);
    this.props.history.push("/blogs/list");
  };

  onSubmitError = error => {
    console.log("blog post publish error", error);
  };

  onBlogSubmitted = values => {
    let mass = this.state.tags; //4
    let tags = "";
    for (let i = 0; i < mass.length; i++) {
      if (i === mass.length - 1) {
        tags = tags + mass[i];
      } else {
        tags = tags + mass[i] + ",";
      }
    }
    console.log(values);
    values.tags = tags;
    console.log(values);
    blogService
      .submitBlogEntry(values)
      .then(this.onSubmitSuccess)
      .catch(this.onSubmitError);
  };

  render() {
    return (
      <Formik
        enableReinitialize={true}
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
              {/* <LocationCapture onChange={this.handleChange} readOnly /> */}
              <div className="content-heading">New Blog Entry</div>

              <div className="row">
                <div className="col-xl-9">
                  <div className="card card-default">
                    <div className="card-body">
                      <Form className="blogToPost" onSubmit={handleSubmit}>
                        {/* <label>Title</label> */}
                        <div className="form-group">
                          <p>Title</p>
                          <Input
                            id="title"
                            // className="mb-3 form-control form-control-lg"
                            type="text"
                            name="title"
                            placeholder="Blog title..."
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.title && touched.title ? "error" : ""
                            }
                          />
                          {errors.title && touched.title && (
                            <label className="error">{errors.title}</label>
                          )}{" "}
                        </div>

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

                        <div>
                          <FormGroup>
                            <p>Body</p>
                            <Input
                              required
                              type="textarea"
                              // style="margin-top: 0px; margin-bottom: 0px; height: 197px;"
                              id="body"
                              // className="form-control wysiwyg mt-3"

                              name="body"
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
                              placeholder="Type new entry ..."
                            />
                          </FormGroup>
                          {errors.body && touched.body && (
                            <label className="error">{errors.body}</label>
                          )}{" "}
                        </div>
                        <br />
                        <div className="form-group">
                          <p>Tags</p>
                          <TagsInput
                            value={this.state.tags}
                            onChange={this.handleChange.bind(this)}
                            //inputValue={this.state.tag}
                          />
                          {/* <Tags
                            onSelectTags={this.handleTags}
                            // <Input
                            id="tags"
                            // className="form-control"
                            type="text"
                            placeholder="Select some options.."
                            name="tags"
                            value={values.tags}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                              errors.tags && touched.tags ? "error" : ""
                            }
                          /> */}
                          {errors.tags && touched.tags && (
                            <label className="error">{errors.tags}</label>
                          )}{" "}
                        </div>

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

                        <br />
                        <div className="clearfix">
                          <div className="float-left">
                            {/* <button className="btn btn-secondary" type="button">
                              <em className="fa fa-edit fa-fw" />
                              Draft
                            </button> */}
                            {/* <button
                              //below is the lat/long button
                              // onClick={this.props.getMyLocation}
                              className="btn btn-green"
                              type="button"
                              disabled={isSubmitting}
                            >
                              <em
                                className="fa fa-check fa-fw"
                                disabled={isSubmitting}
                              />
                              Save For Later
                            </button> */}
                            <button
                              className="btn btn-primary"
                              type="submit"
                              // onClick={this.onClickPublishPost}
                              disabled={isSubmitting}
                            >
                              <em className="fa fa-check fa-fw" />
                              Publish
                            </button>
                            {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
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

export default BlogCreate;
