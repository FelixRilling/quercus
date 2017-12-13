/**
 * TreeLayer class
 *
 * @class
 * @extends Map
 */
const TreeLayer = class extends Map {
    /**
     * Constructor for TreeLayer
     *
     * @constructor
     * @param {any} [data=null]
     */
    constructor(data = null) {
        super();

        this.data = data;
    }
};

export default TreeLayer;
