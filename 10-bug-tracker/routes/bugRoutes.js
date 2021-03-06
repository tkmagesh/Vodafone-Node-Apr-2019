var express = require('express'),
	router = express.Router(),
	bugService = require('../services/bugService');



router.get('/', async (req, res) => {
	try {
		var bugs = await bugService.getAll();
		res.json(bugs);
	} catch(err){
		res.status(500).end();
	}
});

router.get('/:id', (req, res) => {
	var bugId = parseInt(req.params.id);
	bugService.get(bugId)
		.then(bugResult => {
			if (bugResult){
				res.json(bugResult);	
			} else {
				res.status(404).end();
			}
		})
		.catch(err => {
			res.status(500).end();
		});	
});

router.post('/', (req, res) => {
	var bugData = req.body;
	bugService
		.addNew(bugData)
		.then(newBug => {
			res.status(201).json(newBug);
		})
		.catch(err => {
			res.status(500).end();
		})	
});

router.put('/:id', (req, res) => {
	let bugData = req.body,
		bugId = parseInt(req.params.id);
	var updatedBug = bugService.update(bugId, bugData);

	if (updatedBug){
		res.status(200).json(bugData);
	} else {
		res.status(404).end();
	}

});


router.delete('/:id', (req, res) => {
	let bugId = parseInt(req.params.id);
	var result = bugService.remove(bugId);
	if (result){
		res.status(200).json(result);
	} else {
		res.status(404).end();
	}
});

module.exports = router;