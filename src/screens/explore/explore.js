import { useEffect, useState } from "react";
import BirdCard from "../../components/BirdCard/BirdCard";
import "./styles.css";
import { Container, Spinner } from "react-bootstrap";
import axios from "axios";

// import data from "../../data";
function Explore() {
  const [data, setData] = useState([]);

  // Get Data from Server and updatae the state
  useEffect(() => {
    const url = "http://localhost:4000/api/birds";
    axios
      .get(url)
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Container id="explore">
        <h2 className="text-secondary">Birds found in Delhi</h2>
        <div>
          {data.length === 0 ? (
            <Spinner
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
              }}
              animation="border"
            />
          ) : (
            data.map((val, idx) => {
              return <BirdCard key={idx} idx={idx} data={val} />;
            })
          )}
        </div>
      </Container>
    </div>
  );
}

export default Explore;
