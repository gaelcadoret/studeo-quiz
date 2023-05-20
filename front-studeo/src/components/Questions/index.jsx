import { Question } from "./Question";
import axios from "axios";

export const Questions = ({data}) => {


    return data.map(({_id, question, responses}, idx) => (
        <Question
            id={_id}
            title={question}
            choices={responses}
            key={`question_${idx}`}
            // onSubmitResponse={onSubmitResponse}
        />
    ));
}