// Utilities
import Router from 'next/router'
import { useRouter } from 'next/router'
import Link from 'next/link'

// Dependancies
import fetch from 'isomorphic-unfetch'
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
import ReactToPrint from 'react-to-print';

// Custom Components
import Header from '../components/global/Header'
import eventFire from '../functions/eventFire'
import createMarkup from '../functions/createMarkup'

export default class App extends React.Component {

  pdfExportComponent;
  static async getInitialProps({ query: { productID = 301, action } }) {
    const productRequest = await fetch(
      `https://hydrosilintl.com/wp-json/wp/v2/sds/${productID}`
    )
    const productJSON = await productRequest.json()
    const actionURL = action
    
    
    return {
      post: productJSON,
      pid: productID,
      action: actionURL
    }
  }

  // functions
  check() {
    // alert(`Action: ${this.props.action}`);
    if(this.props.action == 'print') {
      eventFire(document.getElementById('productToPript'), 'click');
    } else if (this.props.action == 'download'){
      eventFire(document.getElementById('productToDownload'), 'click');
    }
    // (this.props.acton == 'print' ? print() : alert(`Alerting ${this.props.action}`) )
  }


  


  // When rendered, call print
  componentDidMount() {
    this.check()
  }

  render() {
    return (
      <section className="root-container">
        <section className="responsive-container button-holder">
          <h4>If your Safty Data Sheet has not started downloading, or printing, please use the buttons below to try again.</h4>
          <ReactToPrint
            trigger={() => <a id="productToPript" href="#">Print this page</a>}
            content={() => this.componentRef}
            removeAfterPrint={true}
          />
          <a
            id="productToDownload"
            className="k-button"
            onClick={this.exportPDFWithComponent}
          >
            Download PDF
          </a>
          <Link href="/">
            <a>See all products specs</a>
          </Link>
          <br />
        </section>
        <PDFExport 
          ref={(component) => this.pdfExportComponent = component} 
          paperSize="A4"
          landscape={false}
          title={`${this.props.post.title.rendered}-SDS`}
          fileName={`${this.props.post.title.rendered}-SDS`}
          margin=".25in"
          scale={0.7}
          createMarkup="Hydrosil Internation Node PDF Generator"
        >
          <div ref={el => (this.componentRef = el)}>
            <Header seo={this.props.seo} title={`SDS : ${this.props.title}`} json_ld={this.props.json_ld} />
            <section className="responsive-container product-container">
              <div className="post-body">
                <div className="titles">
                  <h1>{this.props.post.title.rendered}</h1>
                  <h2>{this.props.post.acf.sub_title}</h2>
                </div>
                {/*  */}
                <div className="body_copy sds" dangerouslySetInnerHTML={createMarkup(this.props.post.acf.copy)}></div>
                {/*  */}
              
              </div>
            </section>
          </div>
        </PDFExport>

        <style jsx>{`
          .post-body {
            display:flex;
            align-items: flex-start;
            flex-wrap:wrap;
            justify-content:space-between;
          }
          .titles {
            width:100%;
            padding-top:2em;
            padding-bottom:1em;
            margin-bottom:1em;
            border-bottom:1px solid rgba(0,0,0,.15);
          }
          .body_copy {
            padding-bottom:1em;
          }
          .tpp {
            width:calc(50% - 2em);
            border:1px solid;
          }
          .product-container h4 {
            padding:.5em;
            text-transform: capitalize;
          }

          .button-holder {
            padding-top:2em;
            margin-bottom:4em;
          }
          .button-holder h4 {
            padding-bottom:1em;
          }
          .button-holder a {
            border:1px solid black;
            padding:1em;
            line-height:0;
            display:inline-block;
            margin-right:.5em;
            cursor: pointer;
            transition:500ms;
          }
          .button-holder a:hover {
            background:rgba(155,155,155,.15)
          }
        `}</style>

      </section>
    )
  }

  exportPDFWithComponent = () => {
    this.pdfExportComponent.save();
  }
}


