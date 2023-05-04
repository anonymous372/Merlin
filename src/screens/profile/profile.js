import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { BASE_API_URL } from "../../constant";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { TbMinusVertical } from "react-icons/tb";

import styles from "./profile.module.css";
import { Link } from "react-router-dom";
const Profile = ({}) => {
  const [loading, setLoading] = useState(true);
  const [recentBirds, setRecentBirds] = useState([]);
  const [watchedCount, setWatchedCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(0);
  const [username, setUsername] = useState("");

  const fetchRecentObservations = async () => {
    const token = localStorage.getItem("token") || "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const result = await axios.get(BASE_API_URL + "api/profileData", config);
      if (result.status === 200) {
        const {} = result.data;
      }
      setRecentBirds(result.data.recentBirds);
      setWatchedCount(result.data.watchedCount);
      setRemainingCount(result.data.remainingCount);
      setUsername(result.data.username);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchRecentObservations();
  }, []);
  if (loading)
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  return (
    <Container>
      <div class={styles.container}>
        {/* Username */}
        <h2 className={styles.username}>
          {username.charAt(0).toUpperCase() + username.slice(1)}
        </h2>
        {/* Count */}
        <div className={styles.count}>
          <div className={styles.countRow}>
            <div className={styles.countCol}>
              <AiFillEye className={styles.icon} title="Watched Birds" />
              <p>{watchedCount}</p>
            </div>
            <div className={styles.countCol}>
              <TbMinusVertical
                className={styles.icon}
                style={{ visibility: "hidden" }}
              />
              <TbMinusVertical className={styles.icon} />
            </div>
            <div className={styles.countCol}>
              <ImSearch className={styles.icon} title="Remaining Birds" />
              <p>{remainingCount}</p>
            </div>
          </div>
        </div>
        {/* Recent Watchlist */}
        <div className={styles.birdList}>
          <h3 className="text-center mb-3">Recently watched birds</h3>
          {recentBirds.map((bird) => {
            return (
              <div className={styles.birdRow}>
                <img
                  src={bird.img}
                  alt={bird.comName}
                  className={styles.birdImg}
                />
                <p>{bird.comName}</p>
              </div>
            );
          })}
        </div>
        {/* Link to My List */}
        {watchedCount > 5 && (
          <div className={styles.link} title="View all watched birds">
            <Link to="/myList">View All</Link>
          </div>
        )}
      </div>
    </Container>
  );
};
export default Profile;
