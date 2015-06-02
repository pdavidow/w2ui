W2UI_METEOR.Classes.AbstractSimpleSchemaBasedModelManager = class AbstractSimpleSchemaBasedModelManager {
    static schema() {
        return this.class().schema();
    }
    static class() {
        return this.collection().w2uimeteorClass;
    }
    static collection() {
        W2UI_METEOR.Intent.subtypeImplementation();
    }
    static collectionName() {
        return this.collection()._name;
    }

    static insert(object, onFeedback) {
        Meteor.call("insert", object, this.collectionName(), onFeedback);
    }
    static update(id, changes, onFeedback) {
        Meteor.call("update", id, changes, this.collectionName(), onFeedback);
    }
    static remove(ids, onFeedback) {
        Meteor.call("remove", ids, this.collectionName(), onFeedback);
    }
    static _isZeroCount(queryObject) {
        var cursor;
        cursor = this.collection().find(queryObject);
        return cursor.count() == 0
    }
}
