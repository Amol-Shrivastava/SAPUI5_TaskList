sap.ui.define(
  ["tcs/hr/hire/controllers/BaseController"],
  function (BaseController) {
    BaseController.extend("tcs.hr.hire.controllers.initialPage", {
      onInit: function () {
        console.log("Inside initial page controller");
      },
    });
  }
);
