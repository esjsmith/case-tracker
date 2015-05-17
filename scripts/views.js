/**
 * Created by emilypatonay on 5/2/15.
 */


(function($){
    app.v.addStudies = Backbone.View.extend({

    });


    app.v.OneCaseRow = Backbone.View.extend({

        model: new app.m.OneCaseRow(),
        tagName: 'tr',
        className: 'a-case-row',
        initialize: function(response){
            console.log('init app.v.OneCaseRow');
            this.template = Handlebars.compile($('#one-case-tpl').html())
        },
        render: function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

    app.v.AllCasesTable = Backbone.View.extend({
        el: $('#all-cases-tbl'),
        initialize: function() {
            this.$table = $('#all-cases-tbl');


            // Every time the app view is initialized, the collection is fetched
            // By added {reset: true} to the collection fetch below, we can then
            // listen for the reset event, using that to trigger the this.addAll
            // method, which instantiates the app.
            this.listenTo(app.c.AllCaseRows, 'reset', this.addAll);

            // Suppresses 'add' events with {reset: true} and prevents the app view
            // from being re-rendered for every model. Only renders when the 'reset'
            // event is triggered at the end of the fetch.
            app.c.AllCaseRows.fetch({reset: true});
        },
        addOne: function(aCase){
            console.log(aCase.toJSON().accDate);
            var dataIn = aCase.toJSON();
            var aCaseView = new app.v.OneCaseRow({model: aCase, data: dataIn});
            this.$table.append(aCaseView.render().el);
        },

        addAll: function () {
            console.log('addAll is called');
            this.$table.empty();
            app.c.AllCaseRows.each(this.addOne, this);
        }
    });

})(jQuery);