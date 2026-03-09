export default function errorLogger(err:any){
    console.error(`Error ${err} occurred`);
    throw new Error(err);
}