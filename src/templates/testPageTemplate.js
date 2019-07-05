import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function TestPageTemplate({ data: { javascriptFrontmatter } }) {
  const { frontmatter } = javascriptFrontmatter;

  return (
    <Layout>
      <SEO title={frontmatter.name} />
      <h1>{frontmatter.name}</h1>
      <Link to="/tests">Go back to test picker</Link>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TestPageQuery($name: String!) {
    javascriptFrontmatter(node: { name: { eq: $name } }) {
      frontmatter {
        name
      }
      node {
        name
      }
    }
  }
`
