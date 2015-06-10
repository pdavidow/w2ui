W2UI_METEOR.Schemas.Employee = new SimpleSchema([W2UI_METEOR.Schemas.Person, {
    iq: {
        type: Number,
        label: "IQ",
        min: 100
    },
    badgeNumber: {
        type: Number,
        label: "badgeNumber",
        defaultValue: 1,
        min: 1,
        unique: true ,
        custom: function() {
            if (this.isSet && ! W2UI_METEOR.EmployeeManager.isBadgeNumberUnique(this.value)) {
                return "notUnique";
            };
        }
    },
    creationTimeStamp: { // on server of course
        type: Number,
        label: "creationTimeStamp",
        autoValue: (function() {
            if (this.isInsert) {
                return Date.now();
            }
        }),
        optional: true
    }
}]);


W2UI_METEOR.Employees.attachSchema(W2UI_METEOR.Schemas.Employee, {transform: true});

W2UI_METEOR.Schemas.Context.Employee.default = W2UI_METEOR.Schemas.Employee.namedContext("default");