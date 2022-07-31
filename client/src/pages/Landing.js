import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            My Office <span>Bills</span> app
          </h1>
          <p>
            Why are you still tracking your important Office Work in Paper ? Try
            our application, It is safe to the environement and it is safe for
            your Office. You can take years of your Bills and do advanced
            calculations within seconds.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
