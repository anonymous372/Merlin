import { Container } from "react-bootstrap";
import "./styles.css";

function Main() {
  return (
    <div id="main" className="container">
      <div className="bg-main w-[vmin] h-[90vh]">
        <div className="info">
          <h1 className="main-head">This is Merlin</h1>
          <p>
            This is your personalised bird watching tool. You just need a lil'
            determination and merlin and you are set to watch some new birds.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Main;
