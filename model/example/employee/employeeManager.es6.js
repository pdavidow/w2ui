W2UI_METEOR.EmployeeManager = class EmployeeManager extends W2UI_METEOR.PersonManager {
    static collection() {
        return W2UI_METEOR.Employees;
    }
    static _queryObjectFor__isBadgeNumberUnique(number) {
        return {"badgeNumber": number};
    }
    static _queryObjectFor__isBadgeNumberUnique_ignoring(number, ids) {
        // todo: Ouch! need work-around for now...
        // https://github.com/meteor/meteor/issues/4142
        // https://github.com/meteor/meteor/pull/4235
        return {"badgeNumber": {$eq: number, $nin: ids}};
    }
    static isBadgeNumberUnique(number) {
        var queryObject;

        check(number, Number);

        queryObject = this._queryObjectFor__isBadgeNumberUnique(number);
        return this._isZeroCount(queryObject);
    }
    static isBadgeNumberUnique_ignoring(number, ids) {
        return this._WORKAROUND_isBadgeNumberUnique_ignoring(number, ids); // todo TEMPORARY

        check(number, Number);
        check (ids, ([String]));

        queryObject = this._queryObjectFor__isBadgeNumberUnique_ignoring(number, ids);
        return this._isZeroCount(queryObject);
    }
    static _WORKAROUND_isBadgeNumberUnique_ignoring(number, ids) {
        var queryObject;
        var items;
        var itemsOfInterest;

        check(number, Number);
        check (ids, ([String]));

        queryObject = this._queryObjectFor__isBadgeNumberUnique(number);
        items = this.collection().find(queryObject).fetch();
        itemsOfInterest = _.reject(items, function(each) {
            return _.contains(ids, each._id);
        });
        return _.isEmpty(itemsOfInterest);
    }
}
