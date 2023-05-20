export const Choice = ({ onClickFn, data, idx }) => (
    <p>
        <input type="radio" name={ `question_${data.questionId}` } id={`question_${data.questionId}_${idx}`} onClick={onClickFn} value={data._id} />
        <label htmlFor={ `question_${data.questionId}_${idx}` }>
            { data.answer }
        </label>
    </p>
);