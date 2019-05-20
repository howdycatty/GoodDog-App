import React from "react";
import TagsInput from "react-tagsinput";
// import BlogEditForm from "../../components/Blogs/BlogEditForm3-Practice-Victor";

import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tags: [] };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(tags) {
    this.setState({ tags }, () => {
      this.state.tags.join(",");
      console.log(this.state.tags);
      console.log("does this actually work????", this.state.tags.join(","));
    });
    let tags1 = this.state.tag;
    this.props.onSelectTags(tags1);
  }

  // handleChangeInput(tag) {
  //   this.setState({ tag });
  // }
  // handleTagsChange = () => {
  //   let tags = this.tags.value;
  //   this.props.onSelectTags(tags);
  // };

  render() {
    // const values = this.state;

    return (
      <TagsInput
        ref={ref => (this.tags2 = ref)}
        value={this.state.tags}
        onChange={this.handleChange.bind(this)}
        inputValue={this.state.tag}
      />
    );

    // return (
    //   <TagsInput
    //     value={this.state.tags}
    //     onChange={this.handleChange.bind(this)}
    //   />
    // );
  }
}

export default Tags;
