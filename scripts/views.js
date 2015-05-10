/**
 * Created by emilypatonay on 5/2/15.
 */


(function($){
    app.v.OneCaseRow = Backbone.View.extend({
        model: new app.m.OneCaseRow(),
        tagName: 'tr',
        template: Handlebars.compile($('#one-case-tpl').html()),
        render: function(){
            console.log(this.model);
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

    app.v.AllCasesTable = Backbone.View.extend({
        model: new app.m.AllCasesTable,
        el: $('#output-here'),
        initialize: function() {
            this.model.on('add', this.render, this);
        },
        render: function(){

            return this;
        }
    });

})(jQuery);