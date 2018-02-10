import { quercusPath } from "./types";
interface IQuercus extends Map<any, IQuercus | any> {
    hasPath: (path: quercusPath, quercusNodesAreTruthy: boolean) => boolean;
    getPath: (path: quercusPath) => any | null;
    setPath: (path: quercusPath, val: any) => IQuercus | null;
}
interface IResolvedPath {
    readonly target: IQuercus;
    readonly key: any;
    readonly success: boolean;
}
export { IQuercus, IResolvedPath };
