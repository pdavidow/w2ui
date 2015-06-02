var klass = W2UI_METEOR.Classes.Employee;

W2UI_METEOR.Employees = new Mongo.Collection('employees', {
    transform: function (doc) {
        return klass.fromJSONValue(doc);
    }
});

W2UI_METEOR.Employees.w2uimeteorClass = klass;