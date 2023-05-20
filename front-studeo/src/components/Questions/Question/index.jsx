import styles from "../../../../styles/Home.module.css";
import {Choices} from "../../Choices";

export const Question = ({title, choices}) => (
    <div className={styles.card}>
        <h3>{title}</h3>
        <Choices data={choices} />
    </div>
);