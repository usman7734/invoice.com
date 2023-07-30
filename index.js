$(document).ready(function () {
  $(".add-btn").click(function () {
    $(".item-table-js").append(
      '<tr class="item"> <td "> <div class="two-cells"> <div> <textarea name="" id="" cols="35" rows="3" placeholder="Item Description" ></textarea > </div> <div>  </div> </div> </td> <td "> <input type="text" class="cal quantity" value="0" /> </td> <td "> <input type="text" class="cal rate" value="0" /> </td> <td><input type="text" class="cal tax" value="0" /></td> <td "> <input type="text" class="r-tot"  value="0" readonly /> </td> <td> <div><a href= "javascript:void(0)" class="remove-btn">X</a></div> </td> </tr>'
    );
  });
  $(".item-table-js").on("click", ".remove-btn", function () {
    $(this).parent().parent().parent().remove();
  });

  //calculate when typed
  $(document).on("keyup", ".cal", calcAll);
  $(document).on("click", ".remove-btn", calcAll);
});

// Calculator
function calcAll() {
  var cgst = 0;
  var sgst = 0;
  var igst = 0;
  $(".item").each(function () {
    var qnty = 0;
    var rate = 0;
    var tax = 0;
    var amt = 0;

    if (!isNaN(parseFloat($(this).find(".quantity").val()))) {
      qnty = parseFloat($(this).find(".quantity").val());
    }

    if (!isNaN(parseFloat($(this).find(".rate").val()))) {
      rate = parseFloat($(this).find(".rate").val());
    }

    if (!isNaN(parseFloat($(this).find(".tax").val()))) {
      tax = parseFloat($(this).find(".tax").val());
    }

    amt = rate * qnty;
    cgst += tax * 0.5 * 0.01 * amt;
    sgst += tax * 0.5 * 0.01 * amt;

    $(this).find(".r-tot").val(amt.toFixed(2));
  });
  $("#cgst").val(cgst.toFixed(2));
  $("#sgst").val(sgst.toFixed(2));
  // total gst calculation
  var subt = 0;

  var tot = 0;

  //subtotal
  $(".r-tot").each(function () {
    if (!isNaN(this.value) && this.value.length != 0) {
      subt += parseFloat(this.value);
    }
  });

  igst = sgst + cgst;
  tot = subt + cgst + sgst;
  $("#sub_total").val(subt.toFixed(2));
  $("#igst").val(igst.toFixed(2));
  $("#total").val(tot.toFixed(2));
}

//------- GSTIN Validations

const company_gstin = document.getElementById("company_gstin");
const client_gstin = document.getElementById("client_gstin");

company_gstin.addEventListener("blur", (e) => {
  e.preventDefault();

  if (checksum(company_gstin.value.toUpperCase()) != true) {
    company_gstin.classList.add("error");
    document.getElementById("label-1").style.display = "block";
  } else {
    company_gstin.classList.remove("error");
    document.getElementById("label-1").style.display = "none";
  }
});

client_gstin.addEventListener("blur", (e) => {
  e.preventDefault();

  if (checksum(client_gstin.value.toUpperCase()) != true) {
    client_gstin.classList.add("error");
    document.getElementById("label-2").style.display = "block";
  } else {
    client_gstin.classList.remove("error");
    document.getElementById("label-2").style.display = "none";
  }

  //Check if same or different states(first two numbers)
  if (client_gstin.value.slice(0, 2) === company_gstin.value.slice(0, 2)) {
    $(".csgst").removeClass("hide");
    $("#igst_id").addClass("hide");
  } else {
    $(".csgst").addClass("hide");
    $("#igst_id").removeClass();
  }
});

//gstin checker function

function checksum(g) {
  let regTest = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z\d]{1}$/;
  const res = regTest.test(g);

  return res;
}
