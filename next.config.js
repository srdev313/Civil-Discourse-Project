module.exports = {
  // other next config
  i18n: {
    locales: ['en', 'ms'],
    defaultLocale: 'en',
  },
  env: {
    SPREADSHEET_ID: '1rIZyx9JGqfXV9l8VGxDYSfzT0QByxGUJRkqMXKjM1TQ',
    SHEET_ID: '623736421',
    CLIENT_EMAIL: 'elliot@elliot-340817.iam.gserviceaccount.com',
    PRIVATE_KEY:
      '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCjKyDp9lv0sukr\nQwtsmg6szBItKgZuI6tCWhDu6zqHHHCCdPEuZYWmHYTD7ma5ifcyvw9QfMuUNZq3\n4ffNkj/tt+pLCVa/zlAb5lSVT57uJ2SOI3essK9WeeQ7CYN1V9N06ymriaGNIZa7\n+xUhDI9QTBz2N04c+6hO5qlvbd8qVBLaxPOcMjDvAQ2u8c92fhUQfNqGENC4/BBh\nFQaYbUf8phNqvHhes9NsP8mx/2i0Mo5fGngE13hVDds3/4000KxcWqBZnysk89P/\nNJblp2I3H0ZENunKR0c6/tTXSokUmcHaUXMRGjUlLlMVuG923a8TTX+z9ZzjdT2+\n0u64DXLHAgMBAAECggEAHpGX6v0ioSdbk6VN4JzEHw9kYF29MqkwDpA9F+Wt414q\nneY2wRB4B3UESIjDagM08qbkwZl/slaQk96bxEGgBHMuS7yGKg0G6RMvyYFPLyLm\nLdLrOsknMDZJ0d2oaTV5AjCEcASq5Xvjd3hErxphRxPbYS1fTwK+t3lzSNL2ukEV\nPkpd0RSIW8bhP715YW4o6YL/srjn4VhnsrKv6zjP67mc8KWSmHeQXOAjeuGp+bGn\nxOYvFNXe+2aFEnPnwN9TwCBvxkHmU94IbVrmEjEwQD994D2hDfCAHvjN8t1l/19w\n/Z29z1KdaZRGKWiQpwrbuEsJZt7tCBKG/e+9vyvr4QKBgQDam3go9iE+3+aaOALs\nW5tk6yTkTACOu7dySmhKv5+TbVKxWm2r6f+FCMWQiOp6gIs/uyXrr1deyEEIHeOD\nmMBhWxGCXyD85S2hsu8Cx5BClFTQU1eMrHpSUASbtD1uoocLGn9KxQFdLDQV/Wag\nYjyyzE2SVCeJBrxQbG8gMN6zGQKBgQC/FBCIMIFByLqErIuIbdZrw4QOSztHvSBm\nT9aWnDKDd5DrVi/0vOJ+QHA/2l5uRxf+UENc24Ga1kl1NrIdG/qDJTpGFHqqZYwk\nogW0ibF9bqukMUTAqiyTLsNozr8FlEd/zrwGv26bQKArtmQylh6SYCEglaI16SiJ\nkHd+/Gjw3wKBgQCEcquzzaRI7ulNyN/kioA0/c8lTvMLh6pW4cQcfctWTGdMsyg9\nf5Hj7XOd5YaDYDx+CYqpKFw8PgJAw7Mj+TmeAsox/icDcmtaTApJ2dWKsUpNyiEC\nR0H5eye/ms2ZqXk+ffhfucrgw7ZvGE/EnqB+CBB7tucZO25/H6OYkmNriQKBgQCH\nkZLRLajnpaVAMLOnDlcNimCNS685jOQJ8ydLIHNud0yozDOmLsV70fhSNXq+P060\nrvm8Tjk8REFGGpJwuMMafTVFN454iyfNbe8iUndNiVHaYuJm19ZcbtdR6y34pWW9\nNk6NcxDksgtyOCwLABucuvuGBORb35tVTtyZijhifQKBgQCliQbpvamAFviupgZQ\nrR3azVZrrS1mK3vhikOx+HaPaURvPwColi0xLH8j+YS9371Buf0kQrHSbG4okPKb\nwg1mg311WCuGGqKL1AdhkmmDISiXycsYXSt5pvst8QGF9tqEKNPRXc/ttoP5eRI+\nmwIYaHNKdGHy/A/aaqLgHdpl3g==\n-----END PRIVATE KEY-----\n',
  },
  webpack: (config, options) => {
    config.node = {
      // Some libraries import Node modules but don't use them in the browser.
      // Tell Webpack to provide empty mocks for them so importing them works.
      ...config.node,
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      tls: 'empty',
    }

    return config
  },
}
