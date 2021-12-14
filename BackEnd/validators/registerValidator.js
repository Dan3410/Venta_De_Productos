module.exports ={
    emailValidate:(input) => {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(input);
    }
}