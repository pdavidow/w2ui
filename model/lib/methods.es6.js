// http://stackoverflow.com/questions/10984030/get-meteor-collection-by-name

Meteor.methods({
    insert: function(object, collectionName) {
        var collection;
        var schema;

        if (! W2UI_METEOR.PermissionsHelper.isAllowMethodInsert()) return;

        collection = Mongo.Collection.get(collectionName);
        schema = collection.simpleSchema();
        check(object, schema);

        return collection.insert(object);
    },
    update: function(id, changes, collectionName) {
        var collection;
        var schema;

        if (! W2UI_METEOR.PermissionsHelper.isAllowMethodUpdate()) return;

        collection = Mongo.Collection.get(collectionName);
        schema = collection.simpleSchema();
        check(id, String);
        _.each(_.keys(changes), function(key) {
            var specimen = {};
            specimen[key] = changes[key];
            check(specimen, schema.pick(key)); // https://github.com/aldeed/meteor-simple-schema/issues/251
        });

        return collection.update(id, {$set: changes});
    },
    remove: function(ids, collectionName) {
        var collection;

        if (! W2UI_METEOR.PermissionsHelper.isAllowMethodRemove()) return;

        collection = Mongo.Collection.get(collectionName);
        check(ids, [String]);
        _.each(ids, function(id) {collection.remove(id)});
    }
});