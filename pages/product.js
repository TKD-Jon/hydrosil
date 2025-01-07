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
    static async getInitialProps({ query: { productID = 129, action } }) {
        const productRequest = await fetch(
            `https://hydrosilintl.com/wp-json/wp/v2/products/${productID}`
        )
        const productJSON = await productRequest.json()
        const actionURL = action


        return {
            post: productJSON,
            pid: productID,
            action: actionURL,
            seo: productJSON.yoast_meta,
            title: productJSON.yoast_title,
            seo: productJSON.yoast_meta
        }
    }

    // functions
    check() {
        // alert(`Action: ${this.props.action}`);
        if (this.props.action == 'print') {
            eventFire(document.getElementById('productToPript'), 'click');
        } else if (this.props.action == 'download') {
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
                <PDFExport
                    ref={(component) => this.pdfExportComponent = component}
                    paperSize="A4"
                    landscape={false}
                    title={this.props.post.title.rendered}
                    fileName={this.props.post.title.rendered}
                    margin=".25in"
                    scale={0.6}
                    createMarkup="Hydrosil Internation Node PDF Generator"
                    imageResolution={999}
                >
                    <div ref={el => (this.componentRef = el)}>
                        <Header seo={this.props.seo} title={this.props.title} json_ld={this.props.json_ld} />
                        <section className="responsive-container product-container">
                            <div className="post-body">
                                <div className="titles">
                                    <h1>{this.props.post.title.rendered}</h1>
                                    <h2>{this.props.post.acf.sub_title}</h2>
                                </div>
                                {/*  */}
                                <div className="body_copy" dangerouslySetInnerHTML={createMarkup(this.props.post.acf.body_copy)}></div>
                                {/*  */}
                                <div className="chartSecton">
                                    <h4 className="purp-bg">{this.props.post.acf.chart.text}</h4>
                                    <div className="chartHolder">
                                        {/* <embed type="image/svg+xml" src={this.props.post.acf.chart.chart_image.url} /> */}
                                        <img src={this.props.post.acf.chart.chart_image.url} />
                                        {/* <object type="image/svg+xml" data={this.props.post.acf.chart.chart_image.url}></object> */}
                                    </div>
                                </div>
                                {/*  */}
                                <div className="tpp">
                                    <h4 className="purp-bg">{this.props.post.acf.tpp.section_header.toLowerCase()}</h4>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>Property:</td>
                                                <td>Value:</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.post.acf.tpp.table_generator.map(property =>
                                                <tr>
                                                    <td>{property.property}</td>
                                                    <td>{property.value}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                </PDFExport>

                <section className="responsive-container button-holder">
                    <h4>If you wish to print or download this page please user the buttons below.</h4>
                    <ReactToPrint
                        trigger={() => <a id="productToPript" href="#">Print this page</a>}
                        content={() => this.componentRef}
                        copyStyles={true}
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
                </section>

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
            font-size:1.2em;
            margin-bottom:1em;
          }
          .chartSecton {
            width:100%;
            border:1px solid;
            page-break-after: always;
          }
          .chartHolder {
            padding:3em;
            display:flex;
            align-items: flex-start;
            width:100%;
          }
          .chartHolder img {
            width:100%;
          }
          .tpp {
            margin-top:2em;
            width:100%;
            border:1px solid;
          }
          .product-container h4 {
            padding:1em;
            text-transform: capitalize;
          }
          td {
            padding: 1em;
            font-size: 1.25em;
          }

          .button-holder {
            margin-top:4em;
            border-top:1px solid rgba(0,0,0,.15);
            padding-top:2em;
            margin-bottom:8em;
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

