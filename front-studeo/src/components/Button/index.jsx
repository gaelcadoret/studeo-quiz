export const Button = ({label, onClickFn}) => (
    <>
        <button onClick={onClickFn}>
            {label}
        </button>
    </>
)