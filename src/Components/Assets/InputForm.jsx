function InputForm(props) {
    const { type, name, value, onChange, disabled, placeholder } = props;
    return (
        <input required type={type} placeholder={placeholder} name={name}
            onChange={onChange}
            value={value} disabled={disabled.status} />
    );
}
export default InputForm;