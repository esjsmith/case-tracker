/**
 * Created by emilypatonay on 5/2/15.
 */

(function($){

    // app.js
    'use strict';

	app = new Mn.Application();


    // kick things off by creating the `App`, which is AllCasesTable,
    // ie, the view that renders the entire table, calling with each
    // iteration of the collection, a new row to be created

    new app.v.AllCasesTable();

})(jQuery);