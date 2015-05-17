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
        },

        addStriketrhough: function(dataIn){
            if (dataIn.interpDate !== null) {
                /* If the interpDate !== null, then this will assume that it has already
                been marked as interpreted by the pathologist. In that case, a <span>
                with a class of `strikethrough` will be added, and that whole thing returned.
                Eg, <span class='strkethrough'>CD5</span>
                 */
                return '<span class="strikethrough">' + dataIn.stainCode + '</span>'
            } else {
                /*
                Else, the stain hasn't been marked as interpreted by the pathologist, so
                it should be left unchanged, as per the container element's formatting.
                 */
                return dataIn.stainCode;
            }
        }
    };

})(jQuery);