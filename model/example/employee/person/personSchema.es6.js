W2UI_METEOR.Schemas.Person = new SimpleSchema([W2UI_METEOR.Schemas.AbstractBase, {
    firstName: {
        type: String,
        label: "firstName",
        defaultValue: '{first}'
    },
    lastName: {
        type: String,
        label: "lastName",
        defaultValue: '{last}'
    },
    iq: {
        type: Number,
        label: "IQ",
        min: 0
    },
    favoriteColor: {
        type: String,
        label: "favoriteColor",
        autoValue: (function() {
            if (this.isInsert) {
                return W2UI_METEOR.ColorHelper.randomColorHexStringWithoutHashSign();
            } else if (this.isUpdate && this.isSet) {
                if (_.first(this.value) == "#") return this.value.slice(1);
            }
        }),
        optional: true
    }
}]);

W2UI_METEOR.Persons.attachSchema(W2UI_METEOR.Schemas.Person, {transform: true});

W2UI_METEOR.Schemas.Context.Person.default = W2UI_METEOR.Schemas.Person.namedContext("default");