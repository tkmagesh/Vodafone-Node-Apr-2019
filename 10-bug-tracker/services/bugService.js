var bugDb = require('../db/bugDb');



async function getAll(){
	return await bugDb.getData()
}

function get(id){
	return bugDb
		.getData()
		.then(bugList => {
			var bugResult = bugList.find(bug => bug.id === id)
			if (bugResult){
				return bugResult;
			} else {
				return null;
			}
		});
}

function addNew(bugData, callback){

	return bugDb
		.getData()
		.then(bugList => {
			if (bugData.id === 0){
				bugData.id = bugList.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1;
			}
			bugList.push(bugData);
			return bugDb
				.saveData(bugList)
				.then(() => {
					return bugData;
				});
		});
}

function update(bugId, bugData){
	if (bugList.find(bug => bug.id === bugId)){
		bugList = bugList.map(bug => bug.id === bugId ?  bugData : bug);
		return bugData;
	} else {
		return null;
	}
}

function remove(bugId){
	if (bugList.find(bug => bug.id === bugId)){
		bugList = bugList.filter(bug => bug.id !== bugId);
		return {};
	} else {
		return null;
	}
}

var bugService = {
	getAll : getAll,
	get : get,
	addNew : addNew,
	update : update,
	remove : remove
}

module.exports = bugService;
