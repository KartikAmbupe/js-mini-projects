const ATTACK_VALUE = 10;
const MOSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 19;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';


let battleLog = [];
let lastLoggedEntry;

function getMaxLifeValues(){
    const enteredValue = prompt('Maximum life for you and the monster.', '100');
    let parsedValue = parseInt(enteredValue);

    if(isNaN(parsedValue) || parsedValue <= 0){
        throw {message: 'Invalid user input - Not a number!'}
    }
    return parsedValue;
}

let chosenMaxLife;

try{
    chosenMaxLife = getMaxLifeValues();
}
catch(error){
    console.log(error);
    chosenMaxLife = 100;
    alert('You entered something wrong, default value of 100 was set.');
}


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);


function writeToLog(event, value, mosterHealth, playerHealth){
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: mosterHealth,
        finalPlayerHealth: playerHealth
    };
    switch(event){
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;
        
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
        
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: event,
                value: value,
                finalMonsterHealth: mosterHealth,
                finalPlayerHealth: playerHealth
            };
            break;

        default:
            logEntry = {};
    }

    battleLog.push(logEntry); 
}

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MOSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('The Bonus Life saved you!');
    }

    if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
        alert('You won!');
        writeToLog(LOG_EVENT_GAME_OVER, 'Player Won!', currentMonsterHealth, currentPlayerHealth);
        reset();
    }
    else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert('You Lost!');
        writeToLog(LOG_EVENT_GAME_OVER, 'Monster Won!', currentMonsterHealth, currentPlayerHealth);
        reset();
    }
    else if(currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
        alert('You have a draw!');
        writeToLog(LOG_EVENT_GAME_OVER, 'Its a DRAW', currentMonsterHealth, currentPlayerHealth);
        reset();
    }
}

function attackMoster(attackMode){

    const maxDamage = attackMode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = attackMode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function attackHandler(){
    attackMoster(MODE_ATTACK);
}

function strongAttackHandler(){
    attackMoster(MODE_STRONG_ATTACK);
}

function healPlayerHandler(){
    let healValue;
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't heal to more than your max health");
        healValue = chosenMaxLife - currentPlayerHealth;
    }
    else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);

    endRound();
}

function printLogHandler(){
    for(let i = 0; i < battleLog.length; i++){
        console.log('----------------');
    }
    
    let i = 0;
    for(const logEntry of battleLog){
        if(!lastLoggedEntry && lastLoggedEntry !== 0 || lastLoggedEntry < i){
            console.log(`${i}`);
            for(const key in logEntry){
                console.log(`${key} => ${logEntry[key]}`);
            }
            lastLoggedEntry = i;
            break;
        }
        i++;
        
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);