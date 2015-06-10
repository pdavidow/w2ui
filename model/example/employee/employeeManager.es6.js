W2UI_METEOR.EmployeeManager = class EmployeeManager extends W2UI_METEOR.PersonManager {
    static collection() {
        return W2UI_METEOR.Employees;
    }
    static _queryObjectFor__isBadgeNumberUnique(number) {
        return {"badgeNumber": number};
    }
    static isBadgeNumberUnique(number) {
        var queryObject;

        check(number, Number);

        queryObject = this._queryObjectFor__isBadgeNumberUnique(number);
        return this._isZeroCount(queryObject);
    }
}