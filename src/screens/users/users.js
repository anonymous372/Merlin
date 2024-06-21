import { Container } from "react-bootstrap";
import styles from "./users.module.css";
import { AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../constant";
import { format, formatDistance, isValid, parseISO } from "date-fns";
const Users = () => {
  const [users, setUsers] = useState([]);
  const fetchAllUsers = async () => {
    const token = localStorage.getItem("token") || "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const result = await axios.get(BASE_API_URL + "api/users", config);
      if (result.status === 200) {
        // format dates
        const usersList = result.data.map((user) => {
          //   parse createdAt date
          const parsedDate = parseISO(user.createdAt);
          user.createdAtParsed = isValid(parsedDate)
            ? format(parsedDate, "d MMM yy")
            : "";
          // format lastSeen date
          const parsedLastSeen = parseISO(user.lastSeen);
          user.lastSeenParsed = isValid(parsedLastSeen)
            ? formatDistance(parsedLastSeen, new Date(), { addSuffix: true })
            : "";
          // format username
          user.username =
            user.username.charAt(0).toUpperCase() + user.username.slice(1);
          // format progress
          user.progress = Math.round(
            (user.birdsWatchedCount / user.totalBirdCount) * 100
          );
          return user;
        });
        // sort users by last seen
        usersList.sort((a, b) => {
          return new Date(b.lastSeen) - new Date(a.lastSeen);
        });
        setUsers(usersList);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <Container>
      <div className={styles.container}>
        <h2
          className="text-center mb-10 text-3xl"
          style={{ color: "#3A5BA0", fontWeight: 700 }}
        >
          Our Birdies
        </h2>
        <div className={styles.user_list}>
          {users.map((user) => {
            return (
              <div className={styles.user_item} key={user.username}>
                <img
                  className={styles.profile_image}
                  src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                  alt="Avatar"
                />
                {/* Name & Joined At */}
                <div className={styles.user}>
                  <h5 className={styles.username}>
                    {user.username.slice(0, 10)}
                  </h5>
                  <div className={styles.joined}>
                    (Joined {user.createdAtParsed})
                  </div>
                </div>
                <div className={styles.user_data}>
                  <div className={styles.count_container}>
                    {/* Watch Count */}
                    <div className={styles.count}>
                      <AiFillEye
                        className={styles.icon}
                        title="Watched Birds"
                      />
                      <span>{user.birdsWatchedCount}</span>
                    </div>
                    {/* Progress Bar */}
                    <div className={styles.progress_bar}>
                      <div
                        className={styles.current_progress}
                        style={{ width: `${Math.round(user.progress)}%` }}
                      ></div>
                    </div>
                  </div>
                  {/* Last Seen */}
                  <div className={styles.last_seen}>
                    <div style={{ fontSize: "14px" }}>Last Active</div>
                    <div style={{ marginTop: "-4px" }}>
                      {user.lastSeenParsed}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Users;
