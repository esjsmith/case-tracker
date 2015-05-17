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
        idAttribute: 'idPk',
        parse: function(response){

        }

    });

    app.m.AllAddStudies = Backbone.Model.extend({

    });



    app.m.AllCasesTable = Backbone.Model.extend({});

})(jQuery);