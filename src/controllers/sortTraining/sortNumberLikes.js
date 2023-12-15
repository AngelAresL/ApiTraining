import {sortLikes} from "../../models/sort/index.js";

const sortNumberLikes = async (req, res, next) => {
    try {       
// Ordenamos los entrenamientos por Likes
    const result = await sortLikes();        

    res.status(201).send({
        message: 'Numero de likes de cada entrenamiento.',
        data: result,
      });
    }catch(error){
        next(error);
    }
}

export default sortNumberLikes;