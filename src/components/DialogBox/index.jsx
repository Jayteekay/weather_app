import React, { useEffect, useRef, useState } from "react";
import styles from "./dialog-box.module.scss";

const DialogBox = ({ prompt, onPositive, onNegative }) => {
  return (
    <div className={styles._}>
      <p>{prompt}</p>
      <div className={styles.__buttons}>
        <button className={styles.__positive} onClick={onPositive}>
          Yes, please!
        </button>
        <button className={styles.__negative} onClick={onNegative}>
          No!
        </button>
      </div>
    </div>
  );
};

export default DialogBox;
