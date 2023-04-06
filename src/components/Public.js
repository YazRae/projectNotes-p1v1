import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">Yaz A. Repairs</span>
        </h1>
      </header>
      <main className="public__main">
        <p>Located in Beautifyl downtown city</p>
        <address className="public__addr">
          Yaz A. Repairs
          <br />
          18th lula St.
          <br />
          Downtown city, CM 49333
          <br />
        </address>
        <br />
        <p>Owener: Yaz A.</p>
      </main>
      <footer>
        <Link to={"/login"}>Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
