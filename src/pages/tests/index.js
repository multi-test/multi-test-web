import React, { Component } from "react"
import { graphql, Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

export default class TestPicker extends Component {
  render() {
    const {allJavascriptFrontmatter: {nodes}} = this.props.data;

    return (
      <Layout>
        <SEO title="New test"/>
        <h1>New test</h1>
        <ul>
          {nodes.map(this.renderTestOption, this)}
        </ul>
        <Link to="/">Go back to the homepage</Link>
      </Layout>
    )
  }

  renderTestOption(data) {
    const id = data.node.name;
    const title = data.frontmatter.name;

    return (
      <li>
        <Link key={id} to={`/tests/${id}`}>{title}</Link>
      </li>
    );
  }
}

export const pageQuery = graphql`
  query TestPickerQuery {
    allJavascriptFrontmatter {
      nodes {
        frontmatter {
          name
        }
        node {
          name
        }
      }
    }
  }
`;

