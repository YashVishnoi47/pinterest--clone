console.log("script is working");





let profile_edit_btn = document.querySelector(".profile-img-upload");
let upload_form = document.querySelector("#uploadform");
let upload_form_input = document.querySelector("#uploadform input");

// console.log("profile_edit_btn:", profile_edit_btn);
console.log(upload_form_input)



profile_edit_btn.addEventListener("click",function(){
    // console.log("Profile edit button clicked");
    upload_form_input.click();
});


upload_form_input.addEventListener("change", function(){
    // console.log("File selected, submitting form");  
    upload_form.submit();
});



