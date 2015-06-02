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
            var isUnique;
            if (! this.isSet) return;

            isUnique = true;
            if (this.isInsert) {
                if (! W2UI_METEOR.EmployeeManager.isBadgeNumberUnique(this.value)) {
                    isUnique = false;
                };
            } else if (this.isUpdate) {
                if (! W2UI_METEOR.EmployeeManager.isBadgeNumberUnique_ignoring(this.value, [this.docId])) {
                    isUnique = false;
                }
            }
            if (! isUnique) return "notUnique";
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