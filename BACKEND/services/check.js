require('dotenv').config();

function checkTime() {
    var maintenant = new Date();
    var heureActuelle = maintenant.getHours();

    console.log(heureActuelle);
    if (heureActuelle < 16) {
        return true;
    } else {
        return false;
    }
}
module.exports = { checkTime: checkTime }

