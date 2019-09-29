const Router = require('express').Router;
const {welcome, menu, noSpyMenu, helpMenu, birthMenu, raceMenu} = require('./handler');

const router = new Router();

// POST: /ivr/welcome
router.post('/welcome', (req, res) => {
  res.send(welcome());
});

// POST: /ivr/menu
router.post('/menu', (req, res) => {
  const digit = req.body.Digits;
  return res.send(menu(digit));
});

// POST: /ivr/noSpyMenu
router.post('/noSpyMenu', (req, res) => {
  const digit = req.body.Digits;
  return res.send(noSpyMenu(digit));
});

// POST: /ivr/helpMenu
router.post('/helpMenu', (req, res) => {
  const digit = req.body.Digits;
  return res.send(helpMenu(digit));
});

// POST: /ivr/birthMenu
router.post('/birthMenu', (req, res) => {
  const digit = req.body.Digits;
  return res.send(birthMenu(digit));
});

// POST: /ivr/raceMenu
router.post('/raceMenu', (req, res) => {
  const digit = req.body.Digits;
  return res.send(raceMenu(digit));
});


module.exports = router;
