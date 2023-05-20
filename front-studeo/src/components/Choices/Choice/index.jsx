export const Choice = ({ data, idx }) => (
    <p>
        <input type="radio" name={ `question_${data.questionId}` } id={`question_${data.questionId}_${idx}`} />
        <label htmlFor={ `question_${data.questionId}_${idx}` }>
            { data.answer }
        </label>
    </p>
);