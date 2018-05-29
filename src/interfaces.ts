import { quercusPath } from "./types";

interface IQuercus extends Map<any, IQuercus | any> {
    readonly hasPath: (
        path: quercusPath,
        quercusNodesAreTruthy: boolean
    ) => boolean;
    readonly getPath: (path: quercusPath) => any | null;
    readonly setPath: (path: quercusPath, val: any) => IQuercus | null;
}

interface IResolvedPath {
    readonly target: IQuercus;
    readonly key: any;
    readonly success: boolean;
}

export { IQuercus, IResolvedPath };
