const editBtn = document.getElementsByClassName("profile__edit-btn")[0];
const closeBtn = document.getElementsByClassName("form__toggle")[0];
const popup = document.getElementsByClassName("popup")[0];

editBtn.addEventListener("click", function(){
	popup.classList.add("popup_opened");
});
closeBtn.addEventListener("click", function(){
	popup.classList.remove("popup_opened");
});