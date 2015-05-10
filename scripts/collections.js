/**
 * Created by emilypatonay on 5/4/15.
 */

(function($){
    app.c.AllCaseRows = Backbone.Collection.extend({
        url: 'api/getcases.php'
    });
})(jQuery);