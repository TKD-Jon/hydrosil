// Utilities
import Head from 'next/head'
import Link from 'next/link'

// Dependancies
var borderStyles = '1px solid black'

function Header({ seo, title, json_ld }) {
    return (
        <section className="">
            <section className="Header responsive-container">
                <Head>
                    <title>{title}</title>
                    <link rel="canonical" href="https://hydrosilintl.com/" />
                    <link rel="stylesheet" href="https://use.typekit.net/aiw3hgg.css" />
                    {/* <link rel="shortcut icon" href={favicon} /> */}
                    <link rel="shortcut icon" href="https://hydrosilintl.com/wp-content/uploads/2019/12/cropped-favi-1-192x192.png" />
                </Head>
                <div className="container left">
                    <Link href="/">
                        <img className="dim logo" src="https://hydrosilintl.com/wp-content/uploads/2019/12/purpleLogo.png" />
                    </Link>
                </div>
                <div className="container right header_copy">
                    <strong>Hydrosil International LTD.</strong>
                    <a
                        className="header_address"
                        target="blank"
                        href="https://goo.gl/maps/1AXJaEBxUTLE6r9J6"
                    >125 Prairie Lake Road - East Dundee, IL 60118</a>
                    <p>Phone: <a>847-844-0680</a></p>
                    <p>Emergency Phone: <a>847-844-0680</a></p>
                    <p>Fax: <a>847-844-0799</a></p>
                </div>
            </section>
            <style jsx global>{`
                /*! destyle.css v1.0.11 | MIT License | https://github.com/nicolas-cusan/destyle.css */*{box-sizing:border-box}::after,::before{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent}body{margin:0}main{display:block}address,blockquote,dl,figure,form,iframe,p,pre,table{margin:0}h1,h2,h3,h4,h5,h6{font-size:inherit;line-height:inherit;font-weight:inherit;margin:0}ol,ul{margin:0;padding:0;list-style:none}dt{font-weight:700}dd{margin-left:0}hr{box-sizing:content-box;height:0;overflow:visible;border:0;border-top:1px solid;margin:0;clear:both;color:inherit}pre{font-family:monospace,monospace;font-size:inherit}address{font-style:inherit}a{background-color:transparent;text-decoration:none;color:inherit}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:inherit}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none;vertical-align:bottom}embed,iframe,object{border:0;vertical-align:bottom}button,input,optgroup,select,textarea{-webkit-appearance:none;appearance:none;vertical-align:middle;color:inherit;font:inherit;border:0;background:0 0;padding:0;margin:0;outline:0;border-radius:0;text-align:inherit}[type=checkbox]{-webkit-appearance:checkbox;appearance:checkbox}[type=radio]{-webkit-appearance:radio;appearance:radio}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{cursor:pointer;-webkit-appearance:none;appearance:none}[type=button][disabled],[type=reset][disabled],[type=submit][disabled],button[disabled]{cursor:default}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{margin:0;padding:0;border:0;min-width:0}legend{color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}label[for]{cursor:pointer}details{display:block}summary{display:list-item}table{border-collapse:collapse;border-spacing:0}caption{text-align:left}td,th{vertical-align:top}th{text-align:left;font-weight:700}template{display:none}[hidden]{display:none}
                * {
                    font-family: 'Proxima Nova', sans-serif;
                    color:#231F20;
                    font-size:16px;
                }
                .dim {
                    transition:500ms;
                    cursor:pointer;
                }
                .dim:hover {
                    opacity:.8;
                }
                .responsive-container {
                    max-width:1200px;
                    width:88%;
                    margin:auto;
                }
                .purp-bg {
                    background: #783A6F;
                    color:white;
                }
                .d-flex {
                    display: flex;
                }
                h1 {
                    font-size:2.5em;
                    font-weight:700;
                }
                h2 {
                    font-size:2em;
                    font-weight:600;
                }
                h3 {
                    font-size:1.75em;
                    font-weight:600;
                }
                h4 {
                    font-size:1.5em;
                    font-weight:600;
                }
                p {
                    font-weight:400;
                    font-size:1em;
                }
                .body_copy.sds p {
                    margin-bottom: 1em !important;
                }
                table {
                    width:100%;
                }
                tr {
                    border-bottom:${borderStyles};
                }
                tbody tr:nth-last-of-type(1) {
                    border-bottom:0;
                }
                td {
                    border-right:${borderStyles};
                    padding:.7em;
                }
                td:nth-last-of-type(1) {
                    border-right:0px;
                }
                thead {
                    font-weight:700;
                }
            `}
            </style>
            <style jsx>{`
                .Header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    padding:2em 0;
                    border-bottom:1px solid rgba(0,0,0,.15);
                }
                .Header .right {
                    text-align:right;
                    display:flex;
                    flex-direction:column;
                }
                .logo {
                    width:100%;
                    max-width:350px;
                }
            `}</style>
        </section>
    )
}

export default Header;
