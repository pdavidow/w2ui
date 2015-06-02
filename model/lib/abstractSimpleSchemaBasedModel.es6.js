W2UI_METEOR.Classes.AbstractSimpleSchemaBasedModel = class AbstractSimpleSchemaBasedModel {
    constructor(value) {
        Object.assign(this, value);
    }
    static collection() {
        W2UI_METEOR.Intent.subtypeImplementation();
    }
    static schema() {
        return this.collection().simpleSchema(); // https://github.com/aldeed/meteor-collection2/issues/149
    }
    static defaultSchemaContext() {
        W2UI_METEOR.Intent.subtypeImplementation();
    }
    static manager() {
        W2UI_METEOR.Intent.subtypeImplementation();
    }
    static fromJSONValue(value) {
        return new this(value);
    }
    static defaultAsJSON() {
        return this.schema().clean({});
    }
    static default() {
        var cleanObject = this.defaultAsJSON();
        return new this(cleanObject);
    }
    schema() {
        return this.constructor.schema();
    }
    defaultSchemaContext() {
        return this.constructor.defaultSchemaContext();
    }
    toJSONValue() {
        var result = {};
        var that = this; // Meteor does not play nicely with http://es6-features.org/#Lexicalthis
        _.each(this.schema()._schemaKeys, function(key) {
            var value = that[key];
            if (! _.isUndefined(value)) result[key] = value;
        });
        return result;
    }
}
