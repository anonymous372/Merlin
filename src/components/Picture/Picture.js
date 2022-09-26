import classes from "./styles.module.css";
import { BsX, BsXLg } from "react-icons/bs";
const Picture = ({ data, showPic, setShowPic }) => {
  if (!showPic) return;
  const formatImage = (img) => {
    let arr = img.split("/");
    arr[arr.length - 1] = "1800";
    return arr.join("/");
  };

  return (
    <div className={classes.picture}>
      <img src={formatImage(data.img)}></img>
      <h1>{data.comName || "Pic not found"}</h1>
      <BsXLg
        className={classes.close}
        onClick={() => setShowPic(false)}
      ></BsXLg>
    </div>
  );
};

export default Picture;
