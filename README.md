# case-tracker
JavaScript, PHP, MySQL app to help pathologists track pending cases

More information to follow as the app is developed

* Explanation of views
** app.v.OneCaseRow:
This is responsible for making a single row on the table of cases eventually
presented in the UI. In order to give the data to the Handlebar's template
generator in a usable format, this view defines an `output` object in the 
initialize method. Each key of the `output` object corresponds to a template 
variable that can be found in [[index.html]].

[[Data binding for the api]]
The api that is being built (still a lot of growing pains ahead) will understand
`idPk` as the primary key ID for the case that is being modified by the app. Thus,
I will keep the `idPk` in the `output` object, which will be bound to the UI row
view in the corresponding model. The plan is to pass in the model in Backbone JS's 
[[save]] method.
