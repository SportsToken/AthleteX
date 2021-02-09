class Athlete {

    constructor(Name, Sport, Division)
    {

    }

    getSport()
    {
        return sport
    }
}

// Token Interface
var required = function(){ throw new Error("Implement!"); };
var Token = {
    tknAddress: required,
    tknName: required,
    tknSymbol: required,
}

Athlete.prototype = Object.create(Token);