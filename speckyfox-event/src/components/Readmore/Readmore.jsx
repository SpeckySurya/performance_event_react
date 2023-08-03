import "./Readmore.css";

function Readmore() {
  //   const [check, setcheck] = useState(false);

  //   useEffect(() => {}, []);
  return (
    <div className="container">
      <input type="checkbox" id="check" />
      <p>
        {" "}
        Meet Abhishek Aggarwal, Co-Founder at SpeckyFox, a dynamic and
        accomplished professional with a wealth of experience in the IT
        industry. With an impressive 11-year tenure, Abhishek has honed his
        skills while collaborating with a diverse range of clients, spanning
        from small and mid-size businesses to Fortune 500 companies. As a
        versatile individual, Abhishek effortlessly wears multiple hats and has
        proved himself in various roles throughout his career. With a penchant
        for excellence, Abhishek has specialized in Performance Engineering,
        leveraging his technical expertise to optimize systems and processes,
        ensuring seamless and efficient operations for his clients.
      </p>
      <div className="content" style={{ transition: "2s linear" }}>
        <p>
          His ability to lead and inspire has allowed him to manage delivery
          teams with aplomb, always ensuring that projects are executed with
          precision and within set timelines. Intriguingly, Abhishek has an
          innate talent for navigating the intricacies of pre-sales, showcasing
          his prowess in convincing clients of the value and efficacy of the
          services offered by his company, SpeckyFox Technologies. His
          exceptional negotiation skills further complement his role as he
          crafts mutually beneficial agreements that foster long-term
          partnerships. Embracing new challenges with enthusiasm, Abhishek
          recently shifted his focus to an exciting role as Chief Marketing
          Officer (CMO) at SpeckyFox Technologies. In this capacity, he
          spearheads efforts to promote and enhance the company's online
          visibility, crafting innovative marketing strategies that drive growth
          and market presence. By combining his technical acumen with a flair
          for marketing, Abhishek is poised to propel SpeckyFox Technologies to
          new heights.
        </p>
      </div>
      <label htmlFor="check" className="more">
        <p>Read More...</p>
      </label>

      <label htmlFor="check" className="less">
        <p>Read Less...</p>
        <label
          className="read-more-label"
          htmlFor="check"
          style={{ display: "flex", alignItems: "center" }}
        >
          {/* <p className="more">Read More...</p> */}
        </label>
      </label>
    </div>
  );
}
export default Readmore;
