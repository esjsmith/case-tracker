/**
 * Created by emilypatonay on 5/2/15.
 */


(function($){
    app.v.oneAncilStudy = Backbone.View.extend({
        /* This will take one study and decide if it is complete.
         If complete, it will add a span with a class of 'ancil-done`.
         If incomplete it will merely return the study.
         */
    });

    app.v.AllAncilStudies = Backbone.View.extend({
        // This will take all the ancillary studies and make them an
        // HTML string with tag of <span> and class of `ancil-studies`
        outputArr: [],
        tagName: 'span',
        className: 'ancil-studies',
        makeOutput: function(aCase){
            var that = this;
            // TODO: this is where that <span> needs to be added
            that.outputArr.push(app.formatter.addStriketrhough(aCase));
        },
        initialize: function(response){
            console.log('***');
            this.outputArr = [];
            var that = this;
            if (response.data === null){
                that.outputArr.push('No studies');
            } else {
                _.each(response.data, function(item){
                    that.makeOutput(item);
                });

            }
            that.render(that.outputArr);

        },
        render: function(){
            return this.outputArr.join(' * ');
        }
    });


    app.v.OneCaseRow = Backbone.View.extend({
        tagName: 'tr',
        className: 'a-case-row',
        initialize: function(response){
            var data = response.data;
            this.output = {
                // Each of the keys in this object are present in the Handlebars
                // template in index.html.

                /* app.formatter.date returns and object as follows:
                {sqlDate: 2015-05-17, formatDate: 5/7/2015}
                This is why the data.accDate property is passed in (it's
                in SQL format), then the .formatDate property is the one
                that is passed into this.output.formattedAccDate
                */

                formattedAccDate: (app.formatter.date(data.accDate)).formatDate,
                id: response.data.idPk,
                accNum: app.formatter.accNum(data.wheelNum, data.accDate, data.accNum),
                listIhc: function(){
                    var x = new app.v.AllAncilStudies({data: data.ihc});
                    return x.render();
                },
                listHisto: function(){
                    return 'temp filler';
                },
                listMolec: function(){
                    return 'temp filler';
                }

            };
            this.template = Handlebars.compile($('#one-case-tpl').html())
        },
        render: function(){
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