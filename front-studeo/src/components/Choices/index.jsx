import { Choice } from "./Choice";

export const Choices = ({data}) => data.map(
    (choice, idx) => (
        <Choice data={choice} idx={idx} key={`choice_${idx}`} />
    )
);