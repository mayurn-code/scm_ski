const ValidateNumber = (inputText) => {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return inputText.match(rgx);
}
export { ValidateNumber };