// // <FILE>
// // author: ron williams
// // email: ron.williams@infosecglobal.com
// // date:
// /*
//     Alternative __dirname (current directory)
//     Supporting ES Modules
//     From https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-when-using-the-experimental-modules-flag
//  */
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = dirname(fileURLToPath(import.meta.url));
// export default __dirname;