// Set the html className and title to a given html element.
const setClassAndTitle = (cell, className, title) => {

	if(className) cell.className = className;
	if(title) cell.title = title;

}

export {
	setClassAndTitle
}