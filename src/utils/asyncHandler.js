// const asyncHandler = () => {}

// const asyncHandler = (Func) => {() => {}}
// const asyncHandler = (Func) => async() => {}

const asyyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(
            requestHandler(req, res, next)
        )
            .catch(
            (err) => next(err)
            );
    }

}

export default asyncHandler;

// const asyncHandler = (func) => async (req, res ,next) =>{
//     try {
//         await func(req, res, next);
//     }
//     catch(error){
//         res.send(error.code || 500).json{
//             success:  false,
//             message = error.message;
//         }
//     }
// }


