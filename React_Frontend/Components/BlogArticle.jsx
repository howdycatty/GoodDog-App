import React from "react";
import * as blogService from "../../services/blogService";
import CommentsMap from "../../components/Comments/CommentsMap";
import moment from "moment";

class BlogArticle extends React.Component {
  constructor(props) {
    super(props);
    // const id = this.props.location.pathname.split("/")[2];
    this.state = {
      title: "",
      author: "",
      body: "",
      tags: "",
      dateToPublish: "",
      photoUrl: "",
      statusId: 0,
      entityTypeId: 6,
      entityId: this.props.match.params.id,
    };
  }

  componentDidMount() {
    console.log("mounted");  
    const id = this.props.match.params.id;
    console.log("article id", id);
    blogService
      .getBlogById(id)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdError);
    console.log(this.props.currentUser.id);
  }
  onGetAllByEntitySuccess = response => {
    this.setState({ commentLength: response.data.items.length });
  };

  onGetByIdSuccess = response => {
    console.log("blogarticle Page: get blog by id success", response);
    this.setState({
      title: response.item.title,
      author: response.item.author,
      body: response.item.body,
      tags: response.item.tags,
      dateToPublish: response.item.dateToPublish,
      photoUrl: response.item.photoUrl,
      statusId: response.item.statusId
    });
  };

  onGetByIdError = err => {
    console.log("blogarticle page:get blog by id error", err);
  };

  render() {
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <div className="row">
            {/* Blog Content*/}
            <div className="col-xl-9">
              <div className="card card-default">
                <div className="card-header">
                  <div className="bb">
                    <h2 className="text-lg mt-3">{this.state.title}</h2>
                    <p className="d-flex">
                      <span>
                        <small className="mr-1">
                          By
                          <a className="ml-1" href="">
                            {this.state.author}
                          </a>
                        </small>
                        <small className="mr-1">
                          {moment(this.state.dateToPublish).format(
                            "MMMM DD YYYY"
                          )}
                        </small>
                      </span>
                      {/* <span className="ml-auto">
                        <small>
                          <strong>{this.state.commentLength}</strong>
                          <span>Comments</span>
                        </small>
                      </span> */}
                    </p>
                  </div>
                </div>

                <div
                  className="card-body text-md"
                  // id={blog.id}
                >
                  <br />
                  <div className="row">
                    <div className="col-12">
                      <a href="#">
                        <img
                          className="img-fluid"
                          src={this.state.photoUrl}
                          alt="demo"
                        />
                      </a>
                    </div>
                  </div>
                  <br />
                  <div>
                    <h5>{this.state.body}</h5>
                  </div>
                  <hr className="my-4" />
                  <div className="btn-group" role="group" aria-label="...">
                    <button className="btn btn-secondary" type="button">
                      <em className="fab fa-facebook-f text-muted" />
                    </button>
                    <button className="btn btn-secondary" type="button">
                      <em className="fab fa-twitter text-muted" />
                    </button>

                    <button className="btn btn-secondary" type="button">
                      <em className="fab fa-tumblr text-muted" />
                    </button>
                    <button className="btn btn-secondary" type="button">
                      <em className="fab fa-pinterest text-muted" />
                    </button>
                    {/* <button className="btn btn-secondary" type="button">
                      <em className="fa fa-share-alt text-muted" />
                    </button> */}
                  </div>
                </div>
              </div>
              <CommentsMap
                entityTypeId={this.state.entityTypeId}
                entityId={this.state.entityId}
                currentUser={this.props.currentUser}
                {...this.props}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default BlogArticle;
