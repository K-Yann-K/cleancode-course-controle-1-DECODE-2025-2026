
import weapons from './weaponList.json';

interface Weapon {
    name: string;
    description: string;
    rarity: string;
}

interface FightResult {
    playerHealth: number;
    enemyHealth: number;
    enemyWeapon : Weapon | null;
    hasFought: boolean;
    playerWon: boolean;
    playerLost: boolean;
}

export let weaponList: Weapon[] = [];

export function init() {
    weaponList = weapons as Weapon[];


    let playerMaxHealth = 10;
    let playerCurrentHealth = 10;
    let enemyMaxHealth = 10;
    let enemyCurrentHealth = 10;
    let playerWeapon = weaponList[Math.floor(Math.random() * weaponList.length)];
    let enemyWeapon = null;
    let hasInit = true;
    let hasRound = true;
    let hasFought = false;
    let playerWon = false;
    let playerLost = false;

    return {
        playerMaxHealth,
        playerCurrentHealth,
        enemyMaxHealth,
        enemyCurrentHealth,
        playerWeapon,
        enemyWeapon,
        hasInit,
        hasRound,
        hasFought,
        playerWon,
        playerLost
    }
}

export function newRound(hasInit: boolean) {
    if(!hasInit) {
        throw new Error('Game not initialized');
    }
        weaponList = weapons as Weapon[];

        return {
            playerWeapon: weaponList[Math.floor(Math.random() * weaponList.length)],
            enemyWeapon: null,
            hasRound: true,
            hasFought: false
        };
}

const DammageValue = {
    OneDamage: 1,
    ThreeDamage: 3,
    FiveDamage: 5,
}

const weaponDamageStrategies: Record<string, () => number> = {
    hatchet: () => DammageValue.OneDamage,
    knife: () => DammageValue.OneDamage,
    spear: () => DammageValue.OneDamage,
    dagger: () => DammageValue.ThreeDamage,
    sword: () => DammageValue.FiveDamage,
    halberd: () => DammageValue.FiveDamage,
    bow: ()=> Math.floor(Math.random() * 5),
    crossbow: () => Math.floor(Math.random() * 5),
    darts: () => Math.floor(Math.random() * 5)
}

function calculateWeaponDamage(weapon: Weapon): number {
    const strategy = weaponDamageStrategies[weapon.name];

    if (!strategy) {
        throw new Error('Invalid weapon');
    }
    return strategy();
}

function getRandomWeapon(): Weapon {
    weaponList = weapons as Weapon[];

    return weaponList[Math.floor(Math.random() * weaponList.length)];
}

export function fight(playerHealth: number, enemyHealth: number, playerWeapon: Weapon, hasInit: boolean, hasRound: boolean, hasFought: boolean): FightResult {
    
    if(!hasInit){
        throw new Error('Game not initialized');
    }
    
    if(!hasRound){
        throw new Error('Round not initialized');
    }

    if(hasFought) {
        throw new Error('Round already played');
    }

    const enemyWeapon = getRandomWeapon();

    const playerDamages= calculateWeaponDamage(playerWeapon);
    const enemyDamages=  calculateWeaponDamage(enemyWeapon);

    if(playerDamages > enemyDamages) {
        enemyHealth -= playerDamages - enemyDamages;
    }

    if(enemyDamages > playerDamages) {
        playerHealth -= enemyDamages - playerDamages;
    }

    playerHealth = Math.max(0, playerHealth);
    enemyHealth = Math.max(0, enemyHealth);

    return { playerHealth, enemyHealth, enemyWeapon, hasFought: true,
        playerWon: enemyHealth === 0, playerLost: playerHealth === 0
    }


 

}
