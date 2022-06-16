import { Container } from "react-bootstrap";
import "./styles.css";

function Main() {
  return (
    <Container id="main">
      <div id="bg-main">
        <div className="info">
          <h1 className="main-head">This is Merlin</h1>
          <p>
            This is your personalised bird watching tool. You just need a lil'
            determination and merlin and you are set to watch some new birds.
          </p>
        </div>
      </div>
    </Container>
  );
}

export default Main;
