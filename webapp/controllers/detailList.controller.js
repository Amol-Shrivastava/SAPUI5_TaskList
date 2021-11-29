/* jshint esversion: 6 */

sap.ui.define(
  ["tcs/hr/hire/controllers/BaseController"],
  function (BaseController) {
    return BaseController.extend("tcs.hr.hire.controllers.detailList", {
      onInit: function () {
        console.log("Inside detail List controller");
        // let taskArr = JSON.parse(localStorage.getItem("taskList"));
        // console.log(taskArr)
        // this.getView().getModel("taskList").setProperty("/taskList", taskArr);
        // console.log(
        //   this.getView().getModel("taskList").getProperty("/taskList")
        // );

        // console.log(JSON.parse(localStorage.getItem("taskList")));
        // let taskList = new sap.ui.model.json.JSONModel();
        // taskList.setProperty("/taskList", taskArr);
        // taskList.setData(taskArr);
        // this.getView().setModel(taskList, "task_list");

        // console.log(this.getView().getModel("task_list").oData);
      },

      onAfterRendering: function () {
        // this.getView().byId("taskList").bindItems("taskList>/taskList");
        // console.log(
        //   this.getView().getModel("taskList").getProperty("taskList")
        // );
        // let list = this.getView().byId("taskList");
        // list.bindItems("taskList>/taskList");
      },
    });
  }
);
