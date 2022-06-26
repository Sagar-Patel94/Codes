const express = require('express');
const app = express();

const port = 8080;
require('./models');
var userCtrl = require('./controllers/userController');

app.get("/", (res, resp) => {
    resp.send("Home Page");
});

app.get("/add", userCtrl.addUser);
app.get("/crud", userCtrl.crudOperation);
app.get("/quary", userCtrl.queryData);
app.get("/finder", userCtrl.finderData);
app.get("/setter-getter", userCtrl.setterGetter);
app.get("/validation", userCtrl.validationCont);
app.get("/raw-query", userCtrl.rawQuery);
app.get("/oneToOne", userCtrl.oneToOne);
app.get("/belongsTo", userCtrl.belongsTo);
app.get("/oneToMany", userCtrl.oneToMany);
app.get("/manyToMany", userCtrl.manyToMany);
app.get("/scopes", userCtrl.scopes);
app.get("/polymorphic", userCtrl.polymorphic);
app.get("/polymorphic-many", userCtrl.polymorphicMany);
app.get("/loading", userCtrl.loading);
app.get("/paranoid", userCtrl.paranoid);
app.get("/restore", userCtrl.restoredata);
app.get("/delete-data", userCtrl.deleteData);
app.get("/transactions", userCtrl.transactions);
app.get("/hooks", userCtrl.hooks);
app.get("/query-interface", userCtrl.queryInterfaceData);

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})