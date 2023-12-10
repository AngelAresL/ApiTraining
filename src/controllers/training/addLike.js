import  {generateError}  from "../../helpers/index.js";
import {insertLike, selectLikeById} from "../../models/training/index.js";




const addLike = async (req, res, next) => {
try{
    //Cogemos el id de entrenamiento que se para por parametro
    const trainingId = req.params.idtraining;
    //Cogemos el id del payload de usuario logeado
    const loggedUserId = req.auth.id;
    
//---------------------------------------------------------------------------------------------
    //Necesito saber cuantos registros hay, y despues lanzar error si se cumple el if
    for (let i=1; i<15; i++){
        let [row] = await selectLikeById(i);
        console.log(row.id_user,loggedUserId, row.id_training,trainingId);

        if( row.id_user===loggedUserId && row.id_training===trainingId){
            generateError('Este entrenamiento ya tiene like de este usuario', 400);
        }

    }
    const repeatedLike = (loggedUserId, trainingId);
    if (repeatedLike){
        generateError ('Este usuario ya dio like a este ejercicio',400);
    }
//-------------------------------------------------------------------------------------------


    //Insertamos id de usuario logeado e id de training en la tabla likes        
    const likeId = await insertLike(trainingId, loggedUserId);
    //console.log(likeId);

    if(!likeId){
        generateError('Ha ocurrido un error dando like', 400);
    }
    //Comprobamos que se añadió el like a la tabla
    const result = await selectLikeById(likeId);
    //console.log(result);
    if(!result){
        generateError('Ha ocurrido un error consultando el likeId', 400);
    }

    res.status(201).send({
        message: 'Añadido like correctamente',
        data: result,
    });

}catch(error){
    next(error);
}


}

export default addLike;
