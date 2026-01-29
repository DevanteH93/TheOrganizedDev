import "./globals.css";
import "./fanta.css";
import Head from "./head";
import Link from "next/link";
import Cart from "@/components/Cart";
import EmailInput from "@/components/EmailInput";
import ProductsProvider from "@/context/ProductContent";


export const metadata = {
  title: "TheOrganizedDev",
  description: "Super cool store for programmers and productivity fiends.!",
};

export default function RootLayout({ children }) {
  return (
    <ProductsProvider>
    <html lang="en">
      <Head />
      <body >
        <div id="portal" />
        <div id="app" >
          <header>
            <div className="header-content">
            <Link href={"/"}>
            <h1>&diams;TheOrganizedDev&diams;</h1>
            </Link>

            <h5 className="mid-text">- Cool Stuff For Cool People -</h5>

            <Cart />
            </div>
          </header>

          <main>
            {children}
          </main>
            <div className="hr" />

          <footer>
            <div className="email-container">
              <h5>Get a sneak peak at new additions to the store, special offers, and so much more.</h5>
              <EmailInput />
            </div>
            {/* Change out the code below to have active and live website links!!!!  **leave ./cart alone */}

            

            <div className="links-container"></div>
              <div>
                 <h3>TheOrganizedDev</h3>
                <Link target="_blank" href={'/'}>TheOrganizedDev</Link>
                <br />
                <Link target="_blank" href={'/'}>Roadmap</Link>
              </div>
              <div>
                <h3>Store</h3>
                <Link href={'/'}>Home</Link>
                <br />
                <Link href={'/cart'}>Cart</Link>
              </div>
              <div>
                <h3>Support</h3>
                <Link href={'/contact'}>Contact</Link>
                <br />
                <Link href={'/faq'}>FAQ's</Link>
              </div> 


              {/* update the link (hrefs) below and if needed make changes to the lines of code above this msg -- DELETE THIS NOTE WHEN DONE!!!!!!! */}

            <div className="socials">
              <p>© <a href="https://www.linkedin.com/in/devante-harvey-2281b083/" target="_blank">DevanteHarvey</a> 2025<br /> Built with NextJS & <a target="_blank" href="https://stripe.com/">Stripe</a> 💳</p>
              </div>
              <div className="social-links">
                <Link href={'https://github.com/DevanteH93'} target="_blank"><i className="fa-brands fa-github"></i></Link>
                <Link href={'https://www.linkedin.com/in/devante-harvey-2281b083/'} target="_blank"><i className="fa-brands fa-linkedin-in"></i></Link>
                <Link href={'mailto:devanteh93@gmail.com'} target="_blank"><i className="fa-regular fa-envelope"></i></Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
    </ProductsProvider>  
  );
}