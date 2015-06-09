Meteor.methods({
    insert: function(object, collectionName) {
        var collection;

        if (! W2UI_METEOR.PermissionsHelper.isAllowMethodInsert()) return;

        check(collectionName, String);

        collection = Mongo.Collection.get(collectionName);
        return collection.insert(object);
    },
    update: function(id, changes, collectionName) {
        var collection;


        if (! W2UI_METEOR.PermissionsHelper.isAllowMethodUpdate()) return;

        check(id, String);
        check(collectionName, String);

        collection = Mongo.Collection.get(collectionName);
        return collection.update(id, {$set: changes});
    },
    remove: function(ids, collectionName) {
        var collection;

        if (! W2UI_METEOR.PermissionsHelper.isAllowMethodRemove()) return;

        check(ids, [String]);
        check(collectionName, String);

        collection = Mongo.Collection.get(collectionName);
        _.each(ids, function(id) {collection.remove(id)});
    }
});