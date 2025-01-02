import Vlog from "../models/vlog.model.js";

export const createVlog = async (req, res, next) => {
    try {   
        const vlog = await Vlog.create(req.body);
        return res.status(201).json(vlog);

    } catch (error) {
        next(error);
    }
};