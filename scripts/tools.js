/**
 * Created by emilypatonay on 5/3/15.
 */
var app = app || {};

(function($){
    app.formatter = {
        date: function(dateIn) {
            var date = new Date(dateIn);
            date = date.toLocaleDateString();
            return {
                sqlDate: dateIn,
                formatDate: date
            };
        },

        accNum: function(wheelNum, accDate, accOrder){
            // This tool makes the different data parts into SB15-1234
            var lastTwoYear = accDate.substr(2, 2);
            return wheelNum + lastTwoYear + '-' + accOrder;
        }
    };

})(jQuery);