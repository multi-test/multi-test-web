/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const { data, errors } = await graphql(`
    {
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
  `);

  if (errors) {
    throw errors;
  }

  for (const node of data.allJavascriptFrontmatter.nodes) {
    const { name } = node.node;

    createPage({
      path: `/tests/${name}`,
      component: path.resolve(`src/templates/testPageTemplate.js`),
      context: { name }, // additional data can be passed via context
    })
  }
}

// exports.onCreateNode = ({ actions: { createNodeField }, getNode, node }) => {
//   if (isTestManifest(node)) {
//     const slug = createFilePath({ node, getNode, basePath: `pages/tests` });
//
//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug,
//     });
//   }
// };
//
// function isTestManifest({ internal }) {
//   return internal.type === 'File' && internal.mediaType === 'application/javascript' && internal.description.includes('/tests/');
// }
