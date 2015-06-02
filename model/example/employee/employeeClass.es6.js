W2UI_METEOR.Classes.Employee = class Employee extends W2UI_METEOR.Classes.Person {
    constructor(value) {
        super(value);
    }
    static collection() {
        return W2UI_METEOR.Employees;
    }
    static defaultSchemaContext() {
        return W2UI_METEOR.Schemas.Context.Employee.default;
    }
    static manager() {
        return W2UI_METEOR.EmployeeManager;
    }
    tag() {
        return this.nameFlipped() + " #" + this.badgeNumber;
    }
}