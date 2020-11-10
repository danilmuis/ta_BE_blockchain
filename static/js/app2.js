$(document).ready(function () {
  notary_init();
  // request_permission();
});

// async function request_permission() {
//   if (window.ethereum)
//     try {
//       await window.ethereum.enable();
//     } catch (err) {
//       return showError("Access to your Ethereum account rejected.");
//     }
// }

function send(hash) {
  notary_send(hash, function (err, tx) {
    $("#responseText").html("<p>File berhasil diupload pada blockchain.</p>" +
      "<p>File Hash Value: " + hash + "</p>" +
      "<p>Transaction ID: " + tx + "</p>" +
      "<p>Available at contract address: " + address + "</p>" +
      "<p><b>Please alow a few minutes for transaction to be mined.</b></p>"
    );
  });
};