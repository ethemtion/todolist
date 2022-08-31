let toggleBtCounter = 0;

$(document).ready(function () {
  get();
  store();
  addTooltip();
  showRemaining();
  setInterval(showRemaining, 30000);

  $("#btToggleDone").click(function () {
    ++toggleBtCounter;

    if (toggleBtCounter == 1) {
      doneBodyToggle();
      setTimeout(todoBodyFull, 1250);
      $(this).animate(
        {
          left: "+=47%",
        },
        750
      );
    } else {
      toggleBtCounter = 0;
      todoBodyHalf();
      setTimeout(doneBodyToggle, 1250);
      $(this).animate(
        {
          left: "-=47%",
        },
        750
      );
    }
  });

  $("#todoBody").children().click(function () {
    let thisCheckbox = $(this).children(".toast-header").children(".form-check-input");
    $(thisCheckbox).prop("checked", !thisCheckbox.prop("checked"));
      
    });

    $("#doneBody").children().click(function () {
      let thisCheckbox = $(this).children(".toast-header").children(".form-check-input");
      $(thisCheckbox).prop("checked", !thisCheckbox.prop("checked"));
        
      });
});

function doneBodyToggle() {
  $("#doneHeader").slideToggle(1000);
  $("#doneBody").slideToggle(1000);
}

function todoBodyFull() {
  $("#todoBody").animate(
    {
      width: "100%",
    },
    1000
  );
  $("#buttonGroup").animate(
    {
      width: "75%",
    },
    1000
  );
  $("#btDone").animate(
    {
      width: "75%",
    },
    1000
  );
}

function todoBodyHalf() {
  $("#todoBody").animate(
    {
      width: "50%",
    },
    1000
  );
  $("#buttonGroup").animate(
    {
      width: "100%",
    },
    1000
  );
  $("#btDone").animate(
    {
      width: "100%",
    },
    1000
  );
}

function displayDeadline() {
  let x = $("#todoDeadlineFlag").prop("checked");

  if (x) {
    $("#deadlinePicker").css({
      display: "inline",
    });
    $("#lbDeadlinePicker").css({
      display: "inline",
    });
  } else {
    $("#deadlinePicker").css({
      display: "none",
    });
    $("#lbDeadlinePicker").css({
      display: "none",
    });
  }
}
function editDisplayDeadline() {
  let x = $("#editTodoDeadlineFlag").prop("checked");

  if (x) {
    $("#editDeadlinePicker").css({
      display: "inline",
    });
    $("#lbEditDeadlinePicker").css({
      display: "inline",
    });
  } else {
    $("#editDeadlinePicker").css({
      display: "none",
    });
    $("#lbEditDeadlinePicker").css({
      display: "none",
    });
  }
}

function btNewToDo() {
  let title = $("#todoTitle").val();
  let data = $("#todoData").val();
  let flag = $("#todoDeadlineFlag").prop("checked");
  let color = $("#todoColor").val();
  let html =
    '<div class="toast show w-100 mt-3" style="background-color :' +
    color +
    '"><div class="toast-header">' +
    '<input class="form-check-input" type="checkbox" value= "1" id="editSelect"/>' +
    '<strong class="me-auto ms-3">' +
    title +
    '</strong></div><div class="toast-body"><p>' +
    data +
    " </p></div>" +
    '<div class="toast-footer"><footer class="blockquote-footer">';

  if (flag) {
    let toDoDate = $("#deadlinePicker").val();
    toDoDate = new Date(toDoDate);

    //TARİHİ FOOTERA EKLE
    let year = toDoDate.getUTCFullYear();
    let month = toDoDate.getMonth();
    ++month;
    let day = toDoDate.getDate();
    let hours = toDoDate.getHours();
    let minutes = toDoDate.getMinutes();

    if (minutes <= 9) minutes = "0" + minutes;
    if (month <= 9) month = "0" + month;
    if (hours <= 9) hours = "0" + hours;

    html +=
      hours +
      ":" +
      minutes +
      "&nbsp;&nbsp;&nbsp;&nbsp;" +
      day +
      "." +
      month +
      "." +
      year;
  }
  html += "</footer></div></div>";
  $("#todoBody").append(html);
  store();
  showRemaining();
}

let currentToast;
function funcEdit() {
  let todoBodyChildren = $("#todoBody").children();
  let editFlag, editTitle, editData, editToDoDate, editColor;
  for (let i = 1; i < todoBodyChildren.length; i++) {
    editFlag = $(todoBodyChildren[i])
      .children(".toast-header")
      .children(".form-check-input")
      .prop("checked");

    if (editFlag) {
      currentToast = todoBodyChildren[i];
      $($("#btEdit").attr("data-target")).modal("show");
      editTitle = $(todoBodyChildren[i]).children(".toast-header").text();
      editTitle = editTitle.trim();
      editData = $(todoBodyChildren[i]).children(".toast-body").text();
      editData = editData.trim();
      editColor = $(todoBodyChildren[i]).css("background-color");
      editColor = editColor.slice(4, -1);
      editColor = editColor.split(",");
      let r = editColor[0],
        g = editColor[1],
        b = editColor[2];
      let colorHex = RGBToHex(r, g, b);

      $("#editTodoTitle").val(editTitle);
      $("#editTodoData").val(editData);
      $("#editTodoColor").val(colorHex);
    }
  }
}
function RGBToHex(r, g, b) {
  r = Number(r);
  g = Number(g);
  b = Number(b);
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  // r = r.trim();
  // g = g.trim();
  // b = b.trim();

  return "#" + r.concat(g, b);
}

function btEditTodo() {
  todoTitle = $("#editTodoTitle").val();
  todoData = $("#editTodoData").val();
  let todoColor = $("#editTodoColor").val();
  $(currentToast).css("background-color", todoColor);
  $(currentToast).children(".toast-header").children("strong").text(todoTitle);

  $(currentToast).children(".toast-body").children("p").text(todoData);
  let flag = $("#editTodoDeadlineFlag").prop("checked");
  if (flag) {
    let editTodoDate = $("#editDeadlinePicker").val();
    editTodoDate = new Date(editTodoDate);

    let year = editTodoDate.getUTCFullYear();
    let month = editTodoDate.getMonth();
    ++month;
    let day = editTodoDate.getDate();
    let hours = editTodoDate.getHours();
    let minutes = editTodoDate.getMinutes();

    if (minutes <= 9) minutes = "0" + minutes;
    if (hours <= 9) hours = "0" + hours;
    if (month <= 9) month = "0" + month;

    $(currentToast)
      .children(".toast-footer")
      .children(".blockquote-footer")
      .html(
        hours +
          ":" +
          minutes +
          "&nbsp;&nbsp;&nbsp;&nbsp;" +
          day +
          "." +
          month +
          "." +
          year
      );
  } else {
    $(currentToast)
      .children(".toast-footer")
      .children(".blockquote-footer")
      .html(" ");
  }
  $(currentToast)
    .children(".toast-footer")
    .children(".blockquote-footer")
    .css("color", "black");
  store();
  showRemaining();
}

function funcDelete() {
  let todoBodyChildren = $("#todoBody").children();
  let removeFlag;
  for (let i = 1; i < todoBodyChildren.length; i++) {
    removeFlag = $(todoBodyChildren[i])
      .children(".toast-header")
      .children(".form-check-input")
      .prop("checked");
    if (removeFlag) {
      $(todoBodyChildren[i]).remove();
    }
  }
  store();
}

function funcMarkDone() {
  let todoBodyChildren = $("#todoBody").children();
  let doneFlag, doneHtml;
  let doneBodyChildren = $("#doneBody").children();
  let undoneFlag, undoneHtml;

  for (let i = 1; i < todoBodyChildren.length; i++) {
    doneHtml = '<div class="toast show w-100 mt-3">';
    doneFlag = $(todoBodyChildren[i])
      .children(".toast-header")
      .children(".form-check-input")
      .prop("checked");
    if (doneFlag) {
      doneHtml += $(todoBodyChildren[i]).html();

      $(todoBodyChildren[i]).remove();
      $("#doneBody").append(doneHtml);
    }
  }

  for (let i = 0; i < doneBodyChildren.length; i++) {
    undoneHtml = '<div class="toast show w-100 mt-3">';
    undoneFlag = $(doneBodyChildren[i])
      .children(".toast-header")
      .children(".form-check-input")
      .prop("checked");
    if (undoneFlag) {
      undoneHtml += $(doneBodyChildren[i]).html();

      $(doneBodyChildren[i]).remove();
      $("#todoBody").append(undoneHtml);
    }
  }
  store();
  showRemaining();
}

function store() {
  let todoBodyChildren = $("#todoBody").children();
  let todoBodyLength = todoBodyChildren.length;
  let doneBodyChildren = $("#doneBody").children();
  let doneBodyLength = doneBodyChildren.length;
  doneBodyLength = Number(doneBodyLength);
  todoBodyLength = Number(todoBodyLength);
  let todoHtml, doneHtml;
  for (let i = 2; i < todoBodyLength; i++) {
    todoHtml =
      '<div class="toast show w-100 mt-3" style="background-color :' +
      $(todoBodyChildren[i]).css("background-color") +
      '">' +
      $(todoBodyChildren[i]).html();

    todoJSON = JSON.stringify(todoHtml);
    localStorage.setItem(i, todoJSON);
  }
  localStorage.setItem("todoLength", todoBodyLength);
  for (let i = 0; i < doneBodyLength; i++) {
    doneHtml =
      '<div class="toast show w-100 mt-3" style="background-color :' +
      $(doneBodyChildren[i]).css("background-color") +
      '">' +
      $(doneBodyChildren[i]).html();

    doneJSON = JSON.stringify(doneHtml);
    localStorage.setItem("done" + String(i), doneJSON);
  }
  localStorage.setItem("doneLength", doneBodyLength);
}

function get() {
  let todoBodyLength = localStorage.getItem("todoLength");
  let doneBodyLength = localStorage.getItem("doneLength");
  todoBodyLength = Number(todoBodyLength);
  doneBodyLength = Number(doneBodyLength);
  let todoHtml, doneHtml;
  for (let i = 2; i < todoBodyLength; i++) {
    todoHtml = localStorage.getItem(String(i));
    todoHtml = JSON.parse(todoHtml);
    $("#todoBody").append(todoHtml);
  }
  for (let j = 0; j < doneBodyLength; j++) {
    doneHtml = localStorage.getItem("done" + String(j));
    doneHtml = JSON.parse(doneHtml);

    $("#doneBody").append(doneHtml);
  }
}

let deadlineNearFlag = false;
function showRemaining() {
  let footers = $(".blockquote-footer");
  let footerString;

  for (let i = 0; i < footers.length; i++) {
    let footersText = $(footers[i]).text().trim();
    if (footersText == "") continue;
    let hours = footersText.slice(0, 2);

    let minutes = footersText.slice(3, 5);
    let day = footersText.slice(9, 11);
    let month = footersText.slice(12, 14);

    --month;
    let year = footersText.slice(15);

    // console.log(year, month, day, hours, minutes);
    const date = new Date(year, month, day, hours, minutes);

    let dateMS = date.valueOf();
    const currentDate = new Date();
    let currentDateMS = currentDate.valueOf();

    let remainingMS = dateMS - currentDateMS;

    footerString = calculateRemaining(remainingMS);
    if (deadlineNearFlag == true) {
      $(footers[i]).css("color", "red");
    } else {
      $(footers[i]).css("color", "black");
    }

    $(footers[i]).tooltip("dispose");
    $(footers[i]).attr("title", footerString);
    $(footers[i]).tooltip({
      placement: "right",
    });
    $(footers[i]).tooltip("update");
  }
}

function calculateRemaining(remainingMS) {
  let minutes = 0,
    hours = 0,
    day = 0,
    month = 0,
    year = 0;
  let footerString = "Remaining time : ";
  minutes = Math.ceil(remainingMS / (1000 * 60));

  if (minutes < 0) {
    deadlineNearFlag = true;
    return "Deadline reached!";
  }
  while (minutes >= 60) {
    minutes -= 60;
    hours++;
  }
  while (hours >= 24) {
    hours -= 24;
    day++;
  }

  if (day != 0) footerString += day + " days ";
  if (hours != 0) footerString += hours + " hours ";
  if (minutes != 0) footerString += minutes + " minutes ";

  if (day <= 0 && hours <= 2) {
    deadlineNearFlag = true;
  } else {
    deadlineNearFlag = false;
  }
  return footerString;
}
function addTooltip() {
  let footers = $(".blockquote-footer");

  for (let i = 0; i < footers.length; i++) {
    $(footers[i]).attr("data-bs-toggle", "tooltip");
    footerText = $(footers[i]).text();
    $(footers[i]).attr("title", "");
    $(footers[i]).tooltip({
      placement: "right",
    });
    $(footers[i]).tooltip("hide");
  }
}
