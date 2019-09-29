const VoiceResponse = require('twilio').twiml.VoiceResponse;


//------------STEP 1-------------

exports.welcome = function welcome() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/menu',
    numDigits: '2',
    method: 'POST',
  });

  gather.say(
    'Привет, это Алиса, добро пожаловать в офис C442. ' +
    'Пожалуйста, подтвердите свою личность, нажмите 45 ' + 
    'если вы - шпион russion, или 67, если вы не шпион russion. ',
    {voice: 'woman', language: 'ru-RU', loop: 0}
  );

  return voiceResponse.toString();
};

exports.menu = function menu(digit) {
  const optionActions = {
    '45': spy,
    '67': noSpy,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : redirectWelcome();
};      

//------------STEP 2 spy (45)-------------
/**
 * Returns Twiml
 * @return {String}
 */
function spy() {
  const twiml = new VoiceResponse();

  twiml.say(
    'Я думаю, что вы ошиблись. ' +
    'Мы просто безвредная организация по защите животных ',
    {voice: 'alice', language: 'ru-RU'}
  );

  twiml.hangup();

  return twiml.toString();
}



//------------STEP 2 noSpy (67)-------------
/**
 * Returns a TwiML to interact with the client
 * @return {String}
 */
function noSpy() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/noSpyMenu',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Luckily you found us. ' +
    'We are worried that race laws in germany will come into force soon. ' +
    'Press one if you want to help us, ' +
    'or press two if you are a nazi ',
    {voice: 'alice', language: 'en-GB', loop: 0}
  );

  return voiceResponse.toString();
};

exports.noSpyMenu = function noSpyMenu(digit) {
  const optionActions = {
    '1': help,
    '2': noHelp,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : nospy();
};     

//------------STEP noHelp (1)-------------
/**
 * Returns Twiml
 * @return {String}
 */
function noHelp() {
  const twiml = new VoiceResponse();

  twiml.say(
    'You fucking nazi',
    {voice: 'alice', language: 'en-EN'}
  );

  twiml.hangup();

  return twiml.toString();
}




//------------STEP 2 help (67)-------------
/**
 * Returns a TwiML to interact with the client
 * @return {String}
 */
function help() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/helpMenu',
    numDigits: '4',
    method: 'POST',
  });

  gather.say(
    'We need some information to access the main nazi server ' +
    'that has the required information about the race laws that should be implemented ' +
    'Maybe you have all the information already ?' +
    'Do you know when the birth of evil was? ', 
    {voice: 'man', language: 'en-GB', loop: 0}
  );

  return voiceResponse.toString();
};

exports.helpMenu = function helpMenu(digit) {
  const optionActions = {
    '1889': birth,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : help();
};     


//------------STEP 3 birth (1889)-------------
/**
 * Returns a TwiML to interact with the client
 * @return {String}
 */
function birth() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/birthMenu',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Thank you' +
    'that are the required information about the Nuremberg race Laws we were looking for. ' +
    'Do you also know how many racial classifications the law will have? ' +
    'Please help us, we have to stop these crazy fucking germans ', 
    {voice: 'man', language: 'en-GB', loop: 0}
  );

  return voiceResponse.toString();
};

exports.birthMenu = function birthMenu(digit) {
  const optionActions = {
    '6': race,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : birth();
};     


//------------STEP classifications (6)-------------
/**
 * Returns a TwiML to interact with the client
 * @return {String}
 */
function race() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/raceMenu',
    numDigits: '4',
    method: 'POST',
  });

  gather.say(
    'Nice, that is usefull to know. ' +
    'Now we know what we have to do. We only need one more infromation to ' +
    'get access to the nazi server ' +
    'Do you know when the war should start? ', 
    {voice: 'woman', language: 'en-GB', loop: 0}
  );

  return voiceResponse.toString();
};

exports.raceMenu = function raceMenu(digit) {
  const optionActions = {
    '1939': endCall,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : race();
};   

//------------STEP endCall (1939)-------------
/**
 * Returns an xml with the redirect
 * @return {String}
 */
function endCall() {
  const twiml = new VoiceResponse();

  twiml.say(
    'Okay that that would be soon, but it seems to be plausible. ' +
    'However, now we have two codes, but wich one is correct? ' +
    'you have to find out which one the these bothe codes are correct to stop the nazis. ' +
    'Type it into the website. Thank you for your help! ', 
    {voice: 'man', language: 'en-GB', loop: 3}
  );

  twiml.hangup();

  return twiml.toString();
}



/**
 * Returns an xml with the redirect
 * @return {String}
 */
function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say('Okay, that is obviously false', {
    voice: 'alice',
    language: 'en-GB',
  });

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}
