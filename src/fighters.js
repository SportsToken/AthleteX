// const { default: fighters } = require('oldFighters');
const { isConstructorDeclaration } = require('typescript');

var mma = require('mma')





module.exports = async function getFighters(nameArr) {
    let fighters = nameArr.map(async (name) => {
        mma.fighter(name, (data) =>{
            console.log(data);
            return data;
        });
    })
    const objFighterArray = await Promise.all(fighters);
    return objFighterArray;
}