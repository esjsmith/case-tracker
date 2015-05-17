/**
 * Created by emilypatonay on 5/4/15.
 */

(function($){
    'use strict';

    app.c.AllAddStudies = Backbone.Collection.extend({
        model: app.m.AllAddStudies

    });


    //region The extra parenthesis allows for instantiation and passing the
    // new collection into app.c.AllCaseRows
    var AllCasesVar = Backbone.Collection.extend({
        url: 'api/getcases.php',
        model: app.m.AllCasesTable

    });
    //endregion

    app.c.AllCaseRows = new AllCasesVar();

})(jQuery);