import { About } from "../../components/About/About";
import { Banner } from "../../components/Banner/Banner";
import Footer from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import "./EventHomePage.css";

const EventHomePage = () => {
  return (
    <div className="eventHome">
      <div className="header-div">
        <Header />
      </div>
      <div className="banner-div">
        <Banner></Banner>
      </div>
      <div className="about-speaker-div">
        <About />
      </div>
      <div className="footer-div">
        <Footer />
      </div>
    </div>
  );
};

export default EventHomePage;
