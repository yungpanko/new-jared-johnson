import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-family-secondary is-size-2">About Me</h1>
                  <p className="is-family-primary">
                    I'm a co-founder of <a href='https://www.seasonthree.com'>SEASON THREE</a> and a graduate student at MIT and Harvard. I tweet often as <a href='https://www.twitter.com/yungpanko'>@yungpanko.</a>
                  </p>
            </div>
            <div className="content">
              <h1 className="has-text-weight-bold is-family-secondary is-size-2">My Work</h1>
            </div>
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  style={{ border: '1px solid #333', padding: '2em 4em'}}
                  key={post.id}
                >
                  <p>
                    <Link className="is-family-primary" to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <small>{post.frontmatter.date}</small>
                  </p>
                      <Link to={post.fields.slug}>
                        <PreviewCompatibleImage imageInfo={{
                            image: post.frontmatter.thumbnail,
                            alt: `thumbnail for post ${
                              post.title
                            }`,
                          }}/>
                      </Link>
                  <p className="is-family-primary">
                    {post.frontmatter.description}
                    <br />
                    <br />
                    <Link className="button is-small" to={post.fields.slug}>
                      Keep Reading →
                    </Link>
                  </p>
                </div>
              ))}
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  })
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            thumbnail {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
