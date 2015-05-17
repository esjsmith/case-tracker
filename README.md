# case-tracker
JavaScript, PHP, MySQL app to help pathologists track pending cases

More information to follow as the app is developed


# VIEWS
## app.v.OneCaseRow
This is responsible for making a single row on the table of cases eventually
presented in the UI. In order to give the data to the Handlebar's template
generator in a usable format, this view defines an `output` object in the 
initialize method. Each key of the `output` object corresponds to a template 
variable that can be found in `index.html`.

## app.v.AllAncilStudies
This view outputs HTML string. Handlebars automatically escapes HTML as it 
renders. The engine provides a way to escape this: instead of putting two curly braces
(eg, `{{escapedVariable}}`), triple curly braces forces HTML rendering and no escaping (eg,
`{{{literalVariable}}}`). No doubt, the Handlebars documentation will be helpful.

The view calls `app.formatter.strikethrough` method (see **TOOLS** section below) in
order to render stains with `class='strikethrough'` or plain HTML text.

# TOOLS
## app.formatter.striketrhough
If the `interpDate !== null`, then this will assume that it has already been marked 
as interpreted by the pathologist. In that case, a `<span>` with a class of 
`strikethrough` will be added, and that whole thing returned. Eg, 
`<span class='strikethrough'>CD5</span>`. If there is no `interpDate` returned
from the API (ie, `interpDate === null`), then the app assumes that the
pathologist has not yet marked it as interpreted, and `app.formatter.strikethrough`
will return just the plain string.

# DATA BINDING FOR THE API
The api that is being built (still a lot of growing pains ahead) will understand
`idPk` as the primary key ID for the case that is being modified by the app. Thus,
I will keep the `idPk` in the `output` object, which will be bound to the UI row
view in the corresponding model. The plan is to pass in the model in Backbone JS's 
`save` method.

# Dependencies
* [Handlebars](www.handlebarsjs.org) templating engine (www.handlebarsjs.org).



