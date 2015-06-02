//##############################################################
//##############################################################
// CAREFUL -- see comments @ http://w2ui.com/web/docs/utils
//##############################################################
//##############################################################

if (Meteor.isClient) {
    w2obj.grid.prototype.reload = function () {
        this.recid = "_id";
        var instances = this.w2uimeteorCollection.find({}).fetch();
        this.clear(true);
        this.add(instances);
    };
}