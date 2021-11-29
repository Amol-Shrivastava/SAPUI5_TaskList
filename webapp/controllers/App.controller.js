sap.ui.define(
  ["tcs/hr/hire/controllers/BaseController"],
  function (BaseController) {
    return BaseController.extend("tcs.hr.hire.controller.App", {
      onInit: function () {
       
        console.log("Inside App controller init function");
      },
    });
  }
);
