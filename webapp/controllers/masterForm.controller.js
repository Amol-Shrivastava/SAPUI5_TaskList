/* jshint esversion: 6 */

sap.ui.define(
  ["tcs/hr/hire/controllers/BaseController", "sap/m/MessageToast"],
  function (BaseController, MessageToast) {
    return BaseController.extend("tcs.hr.hire.controllers.masterForm", {
      onInit: function () {
        console.log("Inside master form controller.");
        this.oRouter = this.getOwnerComponent().getRouter();
      },

      //function when submit button is pressed
      submitDetails: function () {
        let {
          taskName,
          taskObj,
          taskDate,
          taskStartTime,
          taskCompletionTime,
          taskSeverity,
        } = this.getView().getModel().getProperty("/inpt_field_structure");

        const taskUid = Math.floor(
          Math.random() * Math.floor(Math.random() * Date.now())
        );

        const task = {
          taskUid,
          taskName,
          taskObj,
          taskDate,
          taskStartTime,
          taskCompletionTime,
          taskSeverity,
        };

        let result = this.validateInputFields(
          taskName,
          taskObj,
          taskDate,
          taskStartTime,
          taskCompletionTime,
          taskSeverity
        );

        if (result) {
          this.storeLocally(task);
          MessageToast.show("Task Saved Succesfully 😃");
          this.clearDetails();

          this.changeURL(taskUid);
        }
      },

      //function to validate inputs
      validateInputFields: function (
        taskName,
        taskObj,
        taskDate,
        taskStartTime,
        taskCompletionTime,
        taskSeverity
      ) {
        if (
          taskName === "" ||
          taskObj === "" ||
          taskDate === "" ||
          taskStartTime === "" ||
          taskCompletionTime === "" ||
          taskSeverity === ""
        ) {
          MessageToast.show("Please fill all the fields 😎");
          return false;
        } else if (parseInt(taskStartTime) > parseInt(taskCompletionTime)) {
          MessageToast.show(
            "Task Start Time cannot be greater than Task Completion Time 😉"
          );
          return false;
        } else if (taskDate !== "") {
          const [taskDateMonth, taskDateVal, taskDateYear] =
            taskDate.split("/");

          const date = new Date();
          const todayDate = date.getDate();

          const todayMonth = date.getMonth() + 1;
          const todayYear = date.getFullYear();
          const taskDateYearVal = parseInt(20 + taskDateYear);

          if (taskDateYearVal < todayYear) {
            MessageToast.show("Task cannot be scheduled for previous year 🤔", {
              width: "30rem",
            });
            return false;
          } else if (
            parseInt(taskDateVal) < todayDate &&
            parseInt(taskDateMonth) < todayMonth
          ) {
            MessageToast.show(
              "Task cannot be scheduled for previous month 😮",
              {
                width: "30rem",
              }
            );
            return false;
          } else if (
            parseInt(taskDateVal) < todayDate &&
            parseInt(taskDateMonth) === todayMonth
          ) {
            MessageToast.show("Task cannot be scheduled for previous date 🤨", {
              width: "30rem",
            });
            return false;
          }
        }
        return true;
      },

      //clean up function for input fields
      clearDetails: function () {
        this.getView()
          .getModel()
          .setProperty("/inpt_field_structure/taskName", "");
        this.getView()
          .getModel()
          .setProperty("/inpt_field_structure/taskObj", "");
        this.getView()
          .getModel()
          .setProperty("/inpt_field_structure/taskDate", "");
        this.getView()
          .getModel()
          .setProperty("/inpt_field_structure/taskStartTime", "");
        this.getView()
          .getModel()
          .setProperty("/inpt_field_structure/taskCompletionTime", "");
        this.getView()
          .getModel()
          .setProperty("/inpt_field_structure/taskSeverity", "");
        this.getView()
          .getModel()
          .setProperty("/inpt_field_structure/stringLength", 0);
      },

      //function to show total strings written in text area
      countWords: function (oEvent) {
        const letters = oEvent.getParameter("value");
        const maxLength = 2000;
        const totalStrings = maxLength - letters.length;
        this.getView()
          .getModel()
          .setProperty("/inpt_field_structure/stringLength", letters.length);

        if (totalStrings === 0) {
          this.getView().byId("textObj_area").setEnabled(false);
          MessageToast.show("You have maxed out the word limit 🙃");
        }
      },

      //function to store task in local storage
      storeLocally: function (task) {
        let tempArr = [];
        tempArr.push(task);
        let storedArr = JSON.parse(localStorage.getItem("taskList"));
        if (storedArr) {
          localStorage.setItem(
            "taskList",
            JSON.stringify([...tempArr, ...storedArr])
          );
        } else {
          localStorage.setItem("taskList", JSON.stringify(tempArr));
        }
        this.getView()
          .getModel("taskList")
          .setProperty(
            "/taskList",
            JSON.parse(localStorage.getItem("taskList"))
          );
        console.log(this.getView().getModel("taskList").oData);
      },

      //function to send taskId to URL for detail Page to fetch it
      changeURL: function (taskid) {
        this.oRouter.navTo("list_detail", {
          task_id: taskid,
        });
      },
    });
  }
);
