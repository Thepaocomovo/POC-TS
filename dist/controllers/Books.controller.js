import { STATUS_CODE } from "../enuns/StatusCodes.js";
var insertNewBook = function (req, res) {
    var teste = req.body;
    res.sendStatus(STATUS_CODE.CREATED);
};
export { insertNewBook, };
