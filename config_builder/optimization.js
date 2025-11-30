/*
* До лучших времён
* */
// import path from "node:path";
// import {glob} from "glob";
// const __dirname = path.resolve();
//
// export const  generateEntries = () => {
//   const entries = {
//     main: path.resolve(__dirname, "src/index.js"),
//   };
//
//   let componentFiles = glob.sync("src/components/**/*.js");
//   componentFiles = componentFiles.map(file => {
//     return path.join(__dirname, file);
//   });
//
//   componentFiles.forEach((file) => {
//     let base = path.basename(file, '.js');
//     console.log(base)
//     if(base !== 'header' && base !== 'footer'){
//       const componentName = path
//         .dirname(file)
//         .split(path.sep)
//         .pop();
//       const entryName = componentName;
//
//       if (!entries[entryName]) {
//         entries[entryName] = file;
//       }
//     }
//   });
//
//   return entries;
// };
