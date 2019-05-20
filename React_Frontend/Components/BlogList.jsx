import React from "react";
import * as blogService from "../../services/blogService";
import { withRouter } from "react-router-dom";
import Pagination from "react-paginating";
import moment from "moment";
// import Comments from "../../components/Comments/TestPage2";
import { BlogsHeader } from "../Comments/Header";

class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      pageIndex: 0,
      pageSize: 6,
      totalCount: 11,
      totalPages: 2,
      currentPage: 1
    };
    console.log("show up", this.state);
  }

  componentDidMount() {
    console.log("mounted");
    blogService
      .getBlogPage(0, this.state.pageSize)
      .then(this.onGetBlogPageSuccess)
      .catch(this.onGetBlogPageError);
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
    blogService
      .getBlogPage(page - 1, this.state.pageSize)
      .then(this.onGetBlogPageSuccess)
      .catch(this.onGetBlogPageError);
  };

  onClickGetArticle = e => {
    const id = e.target.id;
    console.log("BlogEditForm.onClickGetARticle - id");
    this.props.history.push("/blogs/" + id);
    console.log(this.props);
    blogService
      .getBlogById(id)
      .then(this.onGetByIdSuccess)
      .catch(this.onGetByIdError);
  };

  handleClickEdit = e => {
    const id = e.target.id;

    // console.log("id", id)
    // const slug = e.target.slug
    // this.props.history.push("/blogs/" + id + "/" + "edit/" + slug)
    this.props.history.push("/blogs/" + id + "/edit/");

    console.log("this is all??", this.state.blogs);
  };

  onGetByIdSuccess = id => {
    console.log("bloglist page: get blog by id success", id);
  };

  onGetByIdError = error => {
    console.log("bloglist page: get by id error", error);
  };

  onGetBlogPageSuccess = response => {
    console.log("blog page success");
    this.setState({
      blogs: response.item.pagedItems
      // pageIndex: response.item.pageIndex + 1,
      // pageSize: response.item.pageSize,
      // totalCount: response.item.totalCount,
      // totalPages: response.item.totalPages
    });
  };

  onGetBlogPageError = response => {
    console.log("blog page Error");
  };

  mapBlogs = blog => {
    blog.photoUrl =
      blog.photoUrl !== null
        ? blog.photoUrl
        : "https://static.boredpanda.com/blog/wp-content/uploads/2018/10/cutest-puppy-dog-pictures-coverimage.jpg";

    return (
      <React.Fragment key={blog.id}>
        <div className="card">
          <a>
            <img
              //onClick={this.onClickGetArticle}
              //id={blog.id}
              className="img-fluid"
              src={blog.photoUrl}
              // src={blog.photoUrl}
              // src="http://www.hssv.org/assets/img/what-we-do/whatwedo_adopt_availableanimals_dog.jpg"
              alt="No"
            />
          </a>
          <div className="card-body">
            <p className="d-flex">
              <span>
                <small className="mr-1">
                  By
                  <a className="ml-1" href="">
                    {blog.author}
                  </a>
                </small>
                <small className="mr-1">
                  {moment(this.state.dateToPublish).format("MMMM DD YYYY")}
                </small>
              </span>
              <span
                className="ml-auto"
                onClick={e => this.onClickGetArticle(e)}
                // onClick={this.onClickGetArticle}
                id={blog.id}
              >
                <small>
                  <BlogsHeader cnt={blog.cnt} />
                </small>
              </span>
            </p>
            <h4>
              <a href="#">{blog.title}</a>
            </h4>
            {/* <br />
            <h5>Read full article...</h5> */}
            <br />
            {/* <p>{blog.body}</p> */}
            {/* //// removed full article from list page...made more sense to see full article when clicking eyeball icon  */}
            <button
              className="btn btn-sm btn-secondary"
              type="button"
              onClick={this.handleClickEdit.bind(this)}
              id={blog.id}
            >
              <em className="fas fa-pencil-alt" id={blog.id} />
            </button>
            <span> </span>
            <button
              className="btn btn-sm btn-secondary"
              type="button"
              onClick={e => this.onClickGetArticle(e)}
              // onClick={this.onClickGetArticle}
              id={blog.id}
            >
              <em
                className="fa-1x mr-1 fas fa-eye"
                // onClick={this.onClickGetArticle.bind(this)}
                id={blog.id}
              />
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  };

  pagination = () => {
    const { currentPage } = this.state;
    return (
      <Pagination
        total={this.state.totalCount}
        limit={this.state.pageSize}
        pageCount={this.state.totalPage}
        currentPage={currentPage}
      >
        {({
          pages,
          currentPage,
          hasNextPage,
          hasPreviousPage,
          previousPage,
          nextPage,
          totalPages,
          getPageItemProps
        }) => (
          <nav>
            <div className="pagination">
              <li
                className="page-item"
                {...getPageItemProps({
                  pageValue: 1,
                  onPageChange: this.handlePageChange
                })}
              >
                <a className="page-link" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              {hasPreviousPage && (
                <li
                  {...getPageItemProps({
                    pageValue: previousPage,
                    onPageChange: this.handlePageChange
                  })}
                  className="page-item"
                >
                  <a className="page-link">{"<"}</a>
                </li>
              )}
              {pages.map(page => {
                let activePage = null;
                if (currentPage === page) {
                  activePage = { backgroundColor: "#37bc9b" };
                }
                return (
                  <li className="page-item" key={page}>
                    <a
                      className="page-link"
                      style={activePage}
                      {...getPageItemProps({
                        pageValue: page,
                        onPageChange: this.handlePageChange
                      })}
                    >
                      {page}
                    </a>
                  </li>
                );
              })}
              {hasNextPage && (
                <li
                  className="page-item"
                  {...getPageItemProps({
                    pageValue: nextPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  <a className="page-link">{">"}</a>
                </li>
              )}
              <li
                className="page-item"
                {...getPageItemProps({
                  pageValue: totalPages,
                  onPageChange: this.handlePageChange
                })}
              >
                <a className="page-link" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </div>
          </nav>
        )}
      </Pagination>
    );
  };

  render() {
    const blogsList = this.state.blogs.map(this.mapBlogs);

    return (
      <React.Fragment>
        {/* <section className="section-container"> */}
        <div className="content-wrapper">
          <div className="row">
            <div className="col-xl-9">
              <div className="card-columns">
                <div>{blogsList}</div>
              </div>
            </div>
            <div className="col-xl-3">
              {/* <div className="card card-default">
                <div className="card-header">Search</div>
                <div className="card-body">
                  <form className="form-horizontal">
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search for..."
                      />
                      <span className="input-group-btn">
                        <button className="btn btn-secondary" type="button">
                          <em className="fa fa-search" />
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div> */}
              {/* Categories*/}
              {/* <div className="card card-default">
                <div className="card-header">Categories</div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">
                        <em className="fa fa-angle-right fa-fw" />
                        Smartphones
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <em className="fa fa-angle-right fa-fw" />
                        Mobiles
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <em className="fa fa-angle-right fa-fw" />
                        Tech
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <em className="fa fa-angle-right fa-fw" />
                        Inpiration
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <em className="fa fa-angle-right fa-fw" />
                        Workspace
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        {/* </section> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {this.pagination()}
        </div>
      </React.Fragment>
    );
  }
}
export default withRouter(BlogList);
