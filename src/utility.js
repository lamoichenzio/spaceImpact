const setClassAndTitle = (cell, className, title) => {

	if(className) cell.className = className;
	if(title) cell.title = title;

}

export {
	setClassAndTitle
}