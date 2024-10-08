module.exports = ({ env }) => [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "cdn.jsdelivr.net",
            `${env("CDN_BASE_URL")}`,
            "aws-cdn-my.uat4ytlcement.com",
            "aws-cdn-sg.uat4ytlcement.com",
            "aws-cdn-vn.uat4ytlcement.com",
            "ytlc-aws-pwb-stage.s3.ap-southeast-1.amazonaws.com",
            "ytlc-aws-pwb-stage.uat4ytlcement.com",
            "strapi.io",
            `${env("ORIGIN_URL")}`,
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "cdn.jsdelivr.net",
            `${env("CDN_BASE_URL")}`,
            "aws-cdn-my.uat4ytlcement.com",
            "aws-cdn-sg.uat4ytlcement.com",
            "aws-cdn-vn.uat4ytlcement.com",
            "ytlc-aws-pwb-stage.s3.ap-southeast-1.amazonaws.com",
            "ytlc-aws-pwb-stage.uat4ytlcement.com",
            "strapi.io",
            `${env("ORIGIN_URL")}`,
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      formLimit: "256mb", // modify form body
      jsonLimit: "256mb", // modify JSON body
      textLimit: "256mb", // modify text body
      formidable: {
        maxFileSize: 400 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
