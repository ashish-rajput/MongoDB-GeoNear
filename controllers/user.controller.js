const PUMP = require('../models/pump.model');

async function nearestPumpList ( req, res) {
    const { geo, radius } = req.body;

    if(!geo) return responseSrv.validationResponse("please provide your location",res);

    try{

        let query={
            isOpened: true
        }

        let page = 1,  limit = 20, skip = 0;

        if(req.query.page) page = parseInt(req.query.page);
        if(req.query.limit) limit = parseInt(req.query.limit);
        skip = (page -1) *limit

        const result = await PUMP.aggregate([
            {
              $geoNear: {
                 near: { type: "Point", coordinates: geo },
                 distanceField: "dist.calculated",
                 maxDistance: radius *1000 || 20 * 1000,
                 query: query,
                 includeLocs: "geo",
                 spherical: true
              }
            },
            {$skip: skip},
            {$limit: limit}
        ])
        console.log(result.length)
        res.status(200);
        return res.json({ status: 200, message: "Nearest pump List", data: result });
    }
    catch(error){
        console.log(error)
        res.status(400);
        return res.json({ status: 400, error: 'Error occurred' });
    }
}

module.exports = {
    nearestPumpList,
};