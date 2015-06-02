var klass = W2UI_METEOR.Classes.Person;

W2UI_METEOR.Persons = new Mongo.Collection('persons', {
    transform: function (doc) {
        return klass.fromJSONValue(doc);
    }
});

W2UI_METEOR.Persons.w2uimeteorClass = klass;