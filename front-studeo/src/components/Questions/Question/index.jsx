import styles from "../../../../styles/Home.module.css";
import {Choices} from "../../Choices";
import {Button} from "../../Button";
import {useRef, useState} from "react";
import axios from "axios";

export const Question = ({id, title, choices}) => {
    const userResponseInput = useRef(undefined);
    const [choice, setChoice] = useState(undefined);
    const [isError, setIsError] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const onSubmitResponse = (questionId, choice) => {
        const sendResponse = async (questionId, choice) => {
            const res = await axios.post(`http://localhost:8080/user-answers/${questionId}`, {
                userId: "6462ad7d9d00319a3e060a0b",
                answerId: choice,
            });

            setIsError(!res.data.data.isValidResponse)

            if (res.data.data.isValidResponse) {
                userResponseInput.current.innerText = "Bonne réponse :)";
            } else {
                userResponseInput.current.innerText = "Mauvaise réponse :(";
            }
        };

        sendResponse(questionId, choice);
    }

    const submitUserResponse = (e) => {
        e.preventDefault();
        setIsClicked(true);

        if (!choice) {
            userResponseInput.current.innerText = "You need to choose a response before clicking on submit button";
        } else {
            onSubmitResponse(id, choice);
        }
    }

    const handleUpdateChoice = (e) => {
        console.log("choiceId", e.target.value);
        setChoice(e.target.value);
    }

    return (
        <div className={styles.card}>
            <h3>{title}</h3>
            <Choices data={choices} updateChoiceFn={handleUpdateChoice} />
            <Button label="Envoyer" onClickFn={submitUserResponse} />
            <div className={isClicked ? styles.show : styles.hidden }>
                <span id={`response_status_${id}`} ref={userResponseInput} className={isError ? styles.error : styles.success} />
            </div>
        </div>
    )
};