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

    app.m.AddStudies = Backbone.Model.extend({
        // This is the model that will contain the additional studies
        // TODO: format the additional studies
        // TODO: figure out a RESTful way of presenting the data to the user
    });

    app.m.AllCasesTable = Backbone.Model.extend({});

})(jQuery);