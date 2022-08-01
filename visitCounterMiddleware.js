/** import visit counter model */
const visitModel = require("./visitModel");

/**
 * middleware to increase visitors counter
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
exports.visitsMiddleware = async (req, res, next) => {
    /**
     * get today counter based on document _id timestamp from database.
     * returning data that has been made after today's midnight
     */
    const visit = await visitModel.find({
        $where: function () {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return (this._id.getTimestamp() >= today)
        }
    });

    /**
     * increase visitor counter if counter has benn found,
     * or create a new counter for today
     */
    if (visit.length)
        await visitModel.updateOne({ _id: visit[0]._id }, { $inc: { counter: +1 } });
    else
        await visitModel.create({ counter: 1 })

    next();
}