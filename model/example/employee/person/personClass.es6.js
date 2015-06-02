W2UI_METEOR.Classes.Person = class Person extends W2UI_METEOR.Classes.AbstractSimpleSchemaBasedModel {
    constructor(value) {
        super(value);
    }
    static collection() {
        return W2UI_METEOR.Persons;
    }
    static defaultSchemaContext() {
        return W2UI_METEOR.Schemas.Context.Person.default;
    }
    static manager() {
        return W2UI_METEOR.PersonManager;
    }
    nameFlipped() {
        return this.lastName + ', ' + this.firstName;
    }
}



