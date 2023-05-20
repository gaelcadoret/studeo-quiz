import { Choice } from "./Choice";
import {useState} from "react";

export const Choices = ({data, updateChoiceFn}) => {
    return data.map(
        (choice, idx) => (
            <Choice data={choice} idx={idx} key={`choice_${idx}`} onClickFn={updateChoiceFn} />
        )
    )
};