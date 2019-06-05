import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Multitest</h1>
    <ul>
      <li>
        <Link to="/tests/">New test</Link>
      </li>
      <li>
        <Link to="/page-2/">History</Link>
      </li>
      <li>
        <Link to="/page-2/">Settings</Link>
      </li>
      <li>
        <Link to="/page-2/">About</Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
