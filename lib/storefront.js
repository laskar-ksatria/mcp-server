import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export const storefront = {
  request: async (query, variables = {}) => {
    const response = await fetch(
      `${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
        },
        body: JSON.stringify({
          query,
          variables: variables.variables || variables,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};

export const getUturn = async (code, option) => {
  try {
    if (option?.skip)
      return {
        exists: true,
        message: "NFC code exists",
        nfc: [
          {
            ID: 25964,
            NFCCode: "048230225A1D90",
            ShoeID: 11,
            Shoe: {
              ID: 11,
              SKU: "KG151C03021",
              Name: "Retrograde Low",
              Color: "Black White",
              Image: "",
              CreatedAt: "2025-02-16T22:59:28.149334+08:00",
              UpdatedAt: "2025-02-16T22:59:28.149334+08:00",
            },
            CreatedAt: "2025-02-16T23:29:42.236973+08:00",
            UpdatedAt: "2025-02-16T23:29:42.236973+08:00",
          },
        ],
      };
    const response = await fetch(config.UTURN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nfc_code: code,
      }),
    });
    const resp = await response.json();
    return resp;
  } catch (error) {
    throw new Error("Oops, something went wrong!");
  }
};

export const Q_SINGLE_PRODUCT = `
  query Products($handle: String!) {
    onlineShops: metaobject(
      handle: { type: "nfc_online_shop", handle: "stores" }
    ) {
      id
      fields {
        key
        references(first: 10) {
          nodes {
            ... on Metaobject {
              id
              fields {
                key
                value
              }
            }
          }
        }
      }
    }
    product(handle: $handle) {
        id
        title
        description
        handle
        nfcProductTitle: metafield(namespace: "custom", key: "nfc_product_title") {
          id
          value
        }
        crossSelling: metafield(namespace: "custom", key: "cross_selling") {
          references(first: 20) {
            nodes {
              ... on Product {
                title
                handle
                pngImage: metafield(namespace: "nfc", key: "nfc_image") {
                  reference {
                    ... on MediaImage {
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
        pngImage: metafield(namespace: "nfc", key: "nfc_image") {
          reference {
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }
        featuredImage {
          id
          url
          altText
        }
        images(first: 10) {
          nodes {
            id
            url
            altText
          }
        }
        collections(first: 10) {
          nodes {
            title
            metafield(namespace: "nfc", key: "nfc_content") {
              id
              key
              value
              reference {
                ... on Video {
                  sources {
                    url
                  }
                }
                ... on Metaobject {
                  id
                  fields {
                    key
                    type
                    value
                    references(first: 100) {
                      nodes {
                        ... on Metaobject {
                          id
                          fields {
                            key
                            value
                            references(first: 10) {
                              nodes {
                                ... on MediaImage {
                                  id
                                  image {
                                    url
                                    altText
                                  }
                                }
                              }
                            }
                            reference {
                              ... on MediaImage {
                                id
                                image {
                                  url
                                  altText
                                }
                              }
                            }
                          }
                        }
                        ... on MediaImage {
                          id
                          image {
                            url
                            altText
                          }
                        }
                      }
                    }
                    reference {
                      ... on Video {
                        sources {
                          url
                        }
                      }
                      ... on MediaImage {
                        id
                        image {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
  }
`;

export const Q_PRODUCT = `
  query ProductDATA($handle: String!) {
    product(handle: $handle) {
        id
        title
        description
        handle
        images(first: 10) {
          nodes {
            id
            url
            altText
          }
        }
    }
  }
`;
