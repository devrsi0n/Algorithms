/* eslint-disable no-param-reassign */
const contentAuthors = 'content/authors';
const contentPosts = 'content/posts';

const analyze = process.env.ANALYZE;
const isEnvDev = process.env.NODE_ENV === 'development';

const moment = require('moment-timezone');

process.env.GATSBY_BUILD_TIMESTAMP = moment
  .tz(new Date(), 'Asia/Shanghai')
  .format();

const local = true;
const contentful = false;

module.exports = {
  siteMetadata: {
    title: `Algorithms demo`,
    name: `devrsi0n`,
    siteUrl: `https://devrsi0n.com`,
    description: `Algorithms demo`,
    hero: {
      heading: `Algorithms demo`,
      maxWidth: 652,
    },
    social: [
      {
        url: `https://twitter.com/devrsi0n`,
      },
      {
        url: `https://github.com/devrsi0n`,
      },
      {
        url: `https://weibo.com/qianmofeiyu`,
      },
    ],
    isLocal: local,
    repoUrl: 'https://github.com/devrsi0n/blog',
  },
  mapping: {
    'Mdx.frontmatter.author': `AuthorsYaml`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentPosts,
        name: contentPosts,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentAuthors,
        name: contentAuthors,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true,
            },
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer',
            },
          },
        ],
        remarkPlugins: [require(`remark-slug`)], // eslint-disable-line global-require
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        displayName: isEnvDev,
      },
    },
    `gatsby-plugin-theme-ui`,
    // {
    //   resolve: 'gatsby-plugin-mailchimp',
    //   options: {
    //     endpoint: '', // add your MC list endpoint here; see plugin repo for instructions
    //   },
    // },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#6166DC`,
        showSpinner: false,
      },
    },
    // {
    //   resolve: 'gatsby-plugin-google-analytics',
    //   options: {
    //     trackingId: 'UA-108341680-2',
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-eslint',
    //   options: {
    //     test: /\.js$|\.jsx$/,
    //     exclude: /(node_modules|.cache|public)/,
    //     stages: ['develop'],
    //     options: {
    //       fix: true,
    //       emitWarning: true,
    //       failOnError: false,
    //     },
    //   },
    // },
    analyze && {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        analyzerPort: 3001,
        production: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Devrsi0n's blog`,
        short_name: `Devrsi0n`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        title: "Devrsi0n's blog feed",
        output: '/rss.xml',
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        setup: ({
          query: {
            site: { siteMetadata },
          },
          ...rest
        }) => {
          siteMetadata.feed_url = `${siteMetadata.siteUrl}/rss.xml`;
          siteMetadata.image_url = `${siteMetadata.siteUrl}/icons/icon-512x512.png`;
          const siteMetadataModified = siteMetadata;
          siteMetadataModified.feed_url = `${siteMetadata.siteUrl}/rss.xml`;
          siteMetadataModified.image_url = `${siteMetadata.siteUrl}/icons/icon-512x512.png`;

          return {
            ...siteMetadataModified,
            ...rest,
          };
        },
        feeds: [
          {
            title: "Devrsi0n's blog feed",
            output: '/rss.xml',
            serialize: ({ query: { site, allArticle, allContentfulPost } }) => {
              if (local && !contentful) {
                return allArticle.edges
                  .filter(edge => !edge.node.secret)
                  .map(edge => {
                    return {
                      ...edge.node,
                      description: edge.node.excerpt,
                      date: edge.node.date,
                      url: site.siteMetadata.siteUrl + edge.node.slug,
                      guid: site.siteMetadata.siteUrl + edge.node.slug,
                      // custom_elements: [{ "content:encoded": edge.node.body }],
                      author: edge.node.author,
                    };
                  });
              }
              if (!local && contentful) {
                return allContentfulPost.edges
                  .filter(edge => !edge.node.secret)
                  .map(edge => {
                    return {
                      ...edge.node,
                      description: edge.node.excerpt,
                      date: edge.node.date,
                      url: site.siteMetadata.siteUrl + edge.node.slug,
                      guid: site.siteMetadata.siteUrl + edge.node.slug,
                      // custom_elements: [{ "content:encoded": edge.node.body }],
                      author: edge.node.author,
                    };
                  });
              }
              const allArticlesData = { ...allArticle, ...allContentfulPost };
              return allArticlesData.edges
                .filter(edge => !edge.node.secret)
                .map(edge => {
                  return {
                    ...edge.node,
                    description: edge.node.excerpt,
                    date: edge.node.date,
                    url: site.siteMetadata.siteUrl + edge.node.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.slug,
                    // custom_elements: [{ "content:encoded": edge.node.body }],
                    author: edge.node.author,
                  };
                });
            },
            query:
              local && !contentful
                ? `
              {
                allArticle(sort: {order: DESC, fields: date}) {
                  edges {
                    node {
                      excerpt
                      date
                      slug
                      title
                      author
                      secret
                    }
                  }
                }
              }
              `
                : !local && contentful
                ? `
              {
                allContentfulPost(sort: {order: DESC, fields: date}) {
                  edges {
                    node {
                      excerpt
                      date
                      slug
                      title
                      author {
                        name
                      }
                      secret
                    }
                  }
                }
              }
              `
                : `
              {
                allArticle(sort: {order: DESC, fields: date}) {
                  edges {
                    node {
                      excerpt
                      date
                      slug
                      title
                      author
                      secret
                    }
                  }
                }
              }
              {
                allContentfulPost(sort: {order: DESC, fields: date}) {
                  edges {
                    node {
                      excerpt
                      date
                      slug
                      title
                      author {
                        name
                      }
                      secret
                    }
                  }
                }
              }
              `,
          },
        ],
      },
    },
  ].filter(Boolean),
};
