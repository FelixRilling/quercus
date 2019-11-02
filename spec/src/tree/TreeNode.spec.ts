import { TreeNode } from "../../../src/tree/TreeNode";
import { LookupStrategy } from "../../../src/lookup/LookupStrategy";

describe("TreeNode", () => {
    describe("setPath", () => {
        it("throws for empty path", () => {
            const tree = new TreeNode<string, number>();

            expect(() => tree.setPath([], 1)).toThrowMatching(
                err =>
                    (<Error>err).message === "Path may not be empty." &&
                    err instanceof TypeError
            );
        });
    });

    describe("hasPath", () => {
        it("throws for empty path", () => {
            const tree = new TreeNode<string, number>();

            expect(() => tree.hasPath([])).toThrowMatching(
                err =>
                    (<Error>err).message === "Path may not be empty." &&
                    err instanceof TypeError
            );
        });

        it("returns true when an exact match exists", () => {
            const tree = new TreeNode<string, number>();

            tree.setPath(["foo"], 1);

            expect(tree.hasPath(["foo"])).toBe(true);
        });

        it("returns true when an exact nested match exists", () => {
            const tree = new TreeNode<string, number>();

            tree.setPath(["foo", "bar", "fizz"], 1);

            expect(tree.hasPath(["foo", "bar", "fizz"])).toBe(true);
        });

        it("returns true when a nested middle match exists", () => {
            const tree = new TreeNode<string, number>();

            tree.setPath(["foo", "bar", "fizz"], 1);

            expect(tree.hasPath(["foo", "bar"])).toBe(true);
        });

        it("returns false when no match exists", () => {
            const tree = new TreeNode<string, number>();

            expect(tree.hasPath(["foo", "bar"])).toBe(false);
        });

        it("returns false when only a submatch exists", () => {
            const tree = new TreeNode<string, number>();

            tree.setPath(["foo", "bar"], 1);

            expect(tree.hasPath(["foo", "bar", "fizz"])).toBe(false);
        });

        it("returns false when a nested middle match without value exists and the lookup strategy is EXISTENCE_BY_VALUE", () => {
            const tree = new TreeNode<string, number>();

            tree.setPath(["foo", "bar", "fizz"], 1);

            expect(
                tree.hasPath(["foo", "bar"], LookupStrategy.EXISTENCE_BY_VALUE)
            ).toBe(false);
        });

        it("returns true when a nested middle match with value exists and the lookup strategy is EXISTENCE_BY_VALUE", () => {
            const tree = new TreeNode<string, number>();

            tree.setPath(["foo", "bar"], 2);
            tree.setPath(["foo", "bar", "fizz"], 1);

            expect(
                tree.hasPath(["foo", "bar"], LookupStrategy.EXISTENCE_BY_VALUE)
            ).toBe(true);
        });
    });

    describe("getPath", () => {
        it("throws for empty path", () => {
            const tree = new TreeNode<string, number>();

            expect(() => tree.getPath([])).toThrowMatching(
                err =>
                    (<Error>err).message === "Path may not be empty." &&
                    err instanceof TypeError
            );
        });

        it("returns result when an exact match exists", () => {
            const tree = new TreeNode<string, number>();

            tree.setPath(["foo"], 1);

            const result = tree.getPath(["foo"]);
            expect(result.node!.value).toBe(1);
            expect(result.matchedPath).toEqual(["foo"]);
            expect(result.trailingPath).toEqual([]);
        });

        it("returns result when an exact nested match exists", () => {
            const tree = new TreeNode<string, number>();

            tree.setPath(["foo", "bar", "fizz"], 1);

            const result = tree.getPath(["foo", "bar", "fizz"]);
            expect(result.node!.value).toBe(1);
            expect(result.matchedPath).toEqual(["foo", "bar", "fizz"]);
            expect(result.trailingPath).toEqual([]);
        });

        it("returns result when a nested middle match exists", () => {
            const tree = new TreeNode<string, number>();

            tree.setPath(["foo", "bar", "fizz"], 1);

            const result = tree.getPath(["foo", "bar"]);
            expect(result.node!.value).toBe(null);
            expect(result.matchedPath).toEqual(["foo", "bar"]);
            expect(result.trailingPath).toEqual([]);
        });

        it("returns result when no match exists", () => {
            const tree = new TreeNode<string, number>();

            const result = tree.getPath(["foo", "bar"]);
            expect(result.node).toBeNull();
            expect(result.matchedPath).toEqual([]);
            expect(result.trailingPath).toEqual(["foo", "bar"]);
        });

        it("returns result when only a submatch exists", () => {
            const tree = new TreeNode<string, number>();

            tree.setPath(["foo", "bar"], 1);

            const result = tree.getPath(["foo", "bar", "fizz"]);
            expect(result.node).toBeNull();
            expect(result.matchedPath).toEqual(["foo", "bar"]);
            expect(result.trailingPath).toEqual(["fizz"]);
        });
    });
});
