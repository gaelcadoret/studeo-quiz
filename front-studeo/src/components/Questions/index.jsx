import { Question } from "./Question";

export const Questions = ({data}) => data.map(({question, responses}, idx) => (
    <Question title={question} choices={responses} key={`question_${idx}`} />
))