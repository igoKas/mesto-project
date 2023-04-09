const profile = document.querySelector('.profile')
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar');

export function renderUser(user) {
	profile.id = user._id;
	profileAvatar.style.backgroundImage = `url(${user.avatar})`;
	profileName.textContent = user.name;
	profileAbout.textContent = user.about;
}

