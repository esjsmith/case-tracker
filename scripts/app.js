/**
 * Created by emilypatonay on 5/2/15.
 */

(function($){

    var allCases = new app.v.AllCasesTable();

    $(document).ready(function(){
        console.log(allCases);
        allCases.render();
    })

})(jQuery);