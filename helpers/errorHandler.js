const ErrorList = {
    "OWNERSHIP_MISSING" : {
        message: "You don't own or this form doesnt's exist",
        code: 405
    }
};
const handler = (e) => {
    res.status(ErrorList[e].code).json(ErrorList[e].message)
};


export default handler