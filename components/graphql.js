import gql from 'graphql-tag';
export const UPDATE_PRODUCTS = gql`
  mutation productUpdate($input: ProductInput!) {
    productUpdate(input: $input) {
      product {
        id
        title
        handle
        description
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const SEARCH_PRODUCTS = gql`
  query getProducts($searchquery: String!) {
    products(query: $searchquery first: 50) {
      edges {
        node {
          title
          handle
          description
          id
          variants(first: 1) {
            edges {
              node {
                price
                id
              }
            }
          }
        }
      }
    }
  }
`;
export const constructListproduct = (cursor)=>{
  let addon = ""
  if (cursor) {
    addon = `, after : "${cursor}"`
  }
  return gql`
  query getProducts {
    products(first:50 ${addon}) {
        pageInfo { 
          hasNextPage 
          hasPreviousPage 
        }
        edges {
            cursor
            node {
                title
                handle
                description
                productType
                tags
                vendor
                id
                variants(first: 1) {
                    edges {
                        node {
                            price
                            sku
                            id
                        }
                    }
                }
            }
        }
    }
  }
`;
}

export const constructSearchProduct = (productList, VariantList)=>{

    return gql`
    query getProducts($searchquery: String!) {
      products(query: $searchquery first: 50) {
        edges {
          node {
              ${productList.join("\n")}
            id
            variants(first: 1) {
              edges {
                node {
                  ${VariantList.join("\n")}
                  id
                }
              }
            }
          }
        }
      }
    }
  `;
}