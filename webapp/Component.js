sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
  return UIComponent.extend("tcs.hr.hire.Component", {
    metadata: {
      manifest: "json",
    },

    init: function () {
      UIComponent.prototype.init.apply(this, arguments);

      var oRouter = this.getRouter();
      oRouter.initialize();
      console.log("Inside Component.js file");
    },
  });
});
