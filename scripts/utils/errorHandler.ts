import errorLogger from "./errorLogger";

export default function errorHandler<T extends (...args:any[]) => any>(fun:T):T{
    return ((...args:Parameters<T>) => {
        try{
            return fun(...args);
        } catch(err){
            errorLogger(err);
        }
    }) as T;
}