//Two meathods to  handle these using promises and using try-catch

//1.Using promises
const asynchandler = (fn) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
  };
  
  export { asynchandler };
  
  //2.Using trycatch
  //const asynchandler = () =>{}
  //const asynchandler = (fn)=>() =>{}
  // const asynchandler = (fn) => async (req, res, next) => {
  //   try {
  //   } catch (error) {
  //     res.status(error.code || 500).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // };