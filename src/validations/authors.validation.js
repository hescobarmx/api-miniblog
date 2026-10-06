const validateAuthor = (req, res, next) => {
    const { name, email } = req.body;
   

    if (!name || name.trim() === '') {
        return res.status(400).json({
            error: 'Name is required'
        });
    }

    if (!email || email.trim() === '') {
        return res.status(400).json({
            error: 'Email is required'
        });
    }

    next();
};

const validateIdType = (req, res, next)=>{
     const id  = req.params.id;
     if(isNaN(id) || id % 1 !== 0){
       return res.status(400).json({error: "El id debe ser un numero entero positivo"});
     }

     next();
}

module.exports = {validateIdType, validateAuthor}