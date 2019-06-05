import React from "react"
import { Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const TestPicker = () => (
  <Layout>
    <SEO title="New test" />
    <h1>New test</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default TestPicker
