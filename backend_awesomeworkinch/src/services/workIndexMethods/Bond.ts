import { InitialWorkIndex, resultType, roTapSetType, samplesType } from "../utils/WorkIndexStatic";

class Bond extends InitialWorkIndex{
    targetSieve: number|undefined;
    constructor(samples: samplesType, roTapSet: roTapSetType, background: number, targetSieve?: number) {
        super(samples, roTapSet, background);
        this.targetSieve = targetSieve;
    }

    setTargetSieve(targetSieve: number) {
        this.targetSieve = targetSieve;
    }

    gramsPerRevolutionCalculate(fineFractionProd:number,totalRevolutions:number):number{
        if(fineFractionProd==undefined){
            throw new Error("Fine fraction product must be set");
        }else if(totalRevolutions == undefined){
            throw new Error("Total revolutions must be set");
        }else{
            return fineFractionProd/totalRevolutions;
        };
    }

    WorkIndexCalculate(feedSample:samplesType,productSample:samplesType,fineFractionProd:number,totalRevolutions:number,target:resultType='metric_ton'):number{
        let dividend;
        let Pi;
        if(target=='short_ton'){
            dividend = 44.5;
        }else if(target=='metric_ton'){
            dividend = 44.5*1.1;
        }else{
            throw new Error("Target must be 'short_ton' or 'metric_ton'");
        }
        if(this.targetSieve==undefined){
            throw new Error("Target sieve must be set");
        }else{
            Pi = this.targetSieve**0.23;
        }
        let Gpr = this.gramsPerRevolutionCalculate(fineFractionProd,totalRevolutions) ** 0.82;
        let percentPasanteFeed80 = this.percentCalculate(feedSample);
        let percentPasanteProduct80 = this.percentCalculate(productSample);
        let squarerootF80 = Math.sqrt(this.percent80Calculate(percentPasanteFeed80[1]));
        let squarerootP80 = Math.sqrt(this.percent80Calculate(percentPasanteProduct80[1]));
        let workIndex = dividend/(Pi*Gpr*((10/squarerootP80)-(10/squarerootF80)));
        return workIndex;
    }
}


let samples: samplesType = [59, 298, 373, 156, 230, 91]
let roTapSet: roTapSetType = [12500, 9500, 6300, 4750, 2800, 1700]
let test = new Bond(samples,roTapSet,418);
console.log(test.firstCiclePercents);
console.log(test.firstFeed80);