// Utilities
import Link from 'next/link'

// Dependancies
import fetch from 'isomorphic-unfetch'

// Custom Components
import Header from '../components/global/Header'
import createMarkup from '../functions/createMarkup'

function IndexPage({ page, seo, title, json_ld, products }) {
  return (
    <section className="root-container">
      <Header seo={seo} title={title} json_ld={json_ld}/>
      <section className="responsive-container homepage-container">
        <h1>All Products</h1>  
        <table>
          <thead>
            <tr>
              <td>Product Information:</td>
              <td>Product Image:</td>
              <td>Actions:</td>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <h4>{product.title.rendered}</h4>
                  <strong>{product.acf.sub_title}</strong>
                  <div className="body_copy" dangerouslySetInnerHTML={createMarkup(product.acf.body_copy)}></div>
                </td>
                <td><img className="productImage" src={product.acf.product_image.url} /></td>
                <td>
                  <ul>
                    <li>
                      <Link href={`product?productID=${product.id}`}>
                        <a>View</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={`product?productID=${product.id}&action=print`}>
                        <a>Print</a>
                      </Link>
                    </li>
                    <li>
                      <Link href={`product?productID=${product.id}&action=download`}>
                        <a>Download</a>
                      </Link>
                    </li>
                  </ul>
                </td>
              </tr>
              // console.log(product)
            ))}
            
          </tbody>
        </table>
      <style jsx>{`
        .homepage-container {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          padding-top:2em;
        }
        tr {
          display:flex;
        }
        td {
          display:block;
          padding:1em;
        }
        tr td:nth-of-type(1){
          width:65%;
        }
        tr td:nth-of-type(2){
          width:15%;
          display:flex;
          align-items:center;
        }
        tr td:nth-last-of-type(1){
          width:20%;
        }
        .productImage {
          width:100%;
        }
        ul {
          list-style:disc;
          margin-left:10px;
        }
        ul a {
          cursor:pointer;
          transition:500ms;
        }
        ul a:hover {
          opacity:.5;
        }
      `}</style>
      </section>
    </section>
  )
}

IndexPage.getInitialProps = async ({ req }) => {
  const pageData = await fetch('https://hydrosilintl.com/wp-json/wp/v2/pages/10')
  const pageJSON = await pageData.json()
  
  const formData = await fetch('https://hydrosilintl.com/wp-json/frm/v2/forms/1/fields')
  const formJSON = await formData.json()
  const formFields = Object.keys(formJSON).map(i => formJSON[i])

  const allProducts = await fetch('https://hydrosilintl.com/wp-json/wp/v2/products?per_page=100')
  const productsJSON = await allProducts.json()
 
  return {
    page: pageJSON,
    form: formFields,
    products: productsJSON
  }
}


export default IndexPage
