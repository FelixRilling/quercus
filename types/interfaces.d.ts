import { quercusPath } from "./types";
interface IQurercus extends Map<any, IQurercus | any> {
    hasPath: (path: quercusPath, quercusNodesAreTruthy: boolean) => boolean;
    getPath: (path: quercusPath) => any | null;
    setPath: (path: quercusPath, val: any) => IQurercus | null;
}
interface IResolvedPath {
    readonly target: IQurercus;
    readonly key: any;
    readonly success: boolean;
}
export { IQurercus, IResolvedPath };
