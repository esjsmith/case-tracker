/**
 * Created by emilypatonay on 5/2/15.
 */


(function($){
    app.v.addStudies = Backbone.View.extend({

    });


    app.v.OneCaseRow = Backbone.View.extend({
        tagName: 'tr',
        className: 'a-case-row',
        initialize: function(response){
            var data = response.data;
            this.output = {
                formattedAccDate: (app.formatter.date(response.data.accDate)).formatDate,
                id: response.data.idPk,
                accNum: app.formatter.accNum(data.wheelNum, data.accDate, data.accNum)
            };
            console.log('init app.v.OneCaseRow');
            this.template = Handlebars.compile($('#one-case-tpl').html())
        },
        render: function(){
            // TODO: Add jQuery .find() method to make the tr have an id of data.pkId

            console.log(this.output);
            this.id = this.model.attributes.idPk;
            this.$el.html(this.template(this.output));
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
            var aCaseView = new app.v.OneCaseRow({model: aCase, data: aCase.toJSON()});
            this.$table.append(aCaseView.render().el);
        },

        addAll: function () {
            this.$table.empty();
            app.c.AllCaseRows.each(this.addOne, this);
        }
    });

})(jQuery);