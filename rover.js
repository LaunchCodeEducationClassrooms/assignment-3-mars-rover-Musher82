class Rover {
  constructor(position = 4321, mode = 'NORMAL', generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
    
    let results = [];

    for (let i = 0; i < message.commands.length; i++) {
      results.push(message.commands[i])
    };
    
    for (let i = 0; i < results.length; i++){
    if (results[i].commandType === 'STATUS_CHECK'){
       results[i] = {completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: 4321}}
      } 
      else if (results[i].commandType === 'MODE_CHANGE'){
        this.mode = message.commands[i].value,
        results[i] = ({completed: true});
      }
      else if (results[i].commandType === 'MOVE'){
       if (this.mode === 'LOW_POWER'){
        results[i] = ({completed: false}) 
        } else {
          this.position = message.commands[i].value
          results[i] = {completed: true}
        }
      }
    };

    return {
      message: message.name,
      results: results
    }
  }

}
module.exports = Rover;