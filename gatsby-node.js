/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ actions: { createNodeField }, getNode, node }) => {
  if (isTestManifest(node)) {
    const slug = createFilePath({ node, getNode, basePath: `pages/tests` });

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

function isTestManifest({ internal }) {
  return internal.type === 'File' && internal.mediaType === 'application/javascript' && internal.description.includes('/tests/');
}
