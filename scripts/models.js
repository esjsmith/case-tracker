/**
 * Created by emilypatonay on 5/2/15.
 */

(function($){

    // The model that will contain all the rows in a table is defined as a collection.

    app.m.OneCaseRow = Backbone.Model.extend({
        defaults: {
            idPk: '',
            accDate: '',
            wheelNum: '',
            accNum: 0,
            ihc: {},
            histochem: {},
            ancil: {}
        },
        idAttribute: 'idPk'
    });

    app.m.AllCasesTable = Backbone.Model.extend({});

})(jQuery);