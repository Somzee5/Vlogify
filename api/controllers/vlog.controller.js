import Vlog from "../models/vlog.model.js";
import { errorHandler } from "../utils/error.js";

export const createVlog = async (req, res, next) => {
    try {   
        const vlog = await Vlog.create(req.body);
        return res.status(201).json(vlog);

    } catch (error) {
        next(error);
    }
};

export const deleteVlog = async (req, res, next) => {
    const vlog = await Vlog.findById(req.params.id);

    if(!vlog)
    {
        return(next(errorHandler(401, 'Vlog Not Found!')));
    }

    if(req.user.id !== vlog.userRef){
        return(next(errorHandler(401, 'You can delete your own vlogs only!')));
    }

    try {
        await Vlog.findByIdAndDelete(req.params.id);
        res.status(200).json('Vlog has been delted');
    } catch (error)
    {
        next(error);
    }
};


export const updateVlog = async (req, res, next) => {
    const vlog = await Vlog.findById(req.params.id);

    if(!vlog)
    {
        return(next(errorHandler(401, 'Vlog Not Found!')));
    }

    if(req.user.id !== vlog.userRef)
    {
        return(next(errorHandler(401, 'You can update your own vlogs only!')));
    }

    try 
    {
        const updatedVlog = await Vlog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );    

        res.status(200).json(updatedVlog);
    } catch (error)
    {
        next(error);
    }
};


export const getVlog = async (req, res, next) => {
    try {
        const vlog = await Vlog.findById(req.params.id);

        if(!vlog)
        {
            return(next(errorHandler(401, 'Vlog Not Found!')));
        }

        res.status(200).json(vlog);

    } catch (error) {
        next(error);
    }
};