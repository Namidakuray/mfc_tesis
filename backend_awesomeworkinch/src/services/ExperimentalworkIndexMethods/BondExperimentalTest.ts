import { InitialWorkIndex, resultType, roTapSetType, samplesType } from "../utils/WorkIndexStatic";
type millType = 'rod'|'ball';
type diameterMetricType = 'meters'|'feet';
type workIndexObjectType = {
    workIndex:number,
    squarerootF80:number,
    squarerootP80:number
}
class BondExperimentalTest extends InitialWorkIndex{
    targetSieve: number|undefined;
    millType:millType;
    resultTarget:resultType;
    diameterMetric:diameterMetricType;
    constructor(
        samples: samplesType,
        roTapSet: roTapSetType,
        background: number,
        targetSieve?: number,
        millType:millType='ball',
        resultTarget:resultType='metric_ton',
        diameterMetric:diameterMetricType='feet'
        ) {
        super(samples, roTapSet, background);
        this.targetSieve = targetSieve;
        this.millType = millType;
        this.resultTarget = resultTarget;
        this.diameterMetric = diameterMetric;
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
    WorkIndexCalculate(feedSample:samplesType,productSample:samplesType,fineFractionProd:number,totalRevolutions:number,resultTarget:resultType=this.resultTarget,millType:millType=this.millType):workIndexObjectType{
        let dividend;
        let Pi;
        if(resultTarget=='short_ton'){
            dividend = 44.5;
        }else if(resultTarget=='metric_ton'){
            dividend = 44.5*1.1;
        }else{
            throw new Error("Target must be 'short_ton' or 'metric_ton'");
        }
        if(this.targetSieve==undefined){
            throw new Error("Target sieve must be set");
        }else{
            Pi = this.targetSieve**0.23;
        }
        let Gpr = millType=='ball' ? this.gramsPerRevolutionCalculate(fineFractionProd,totalRevolutions) ** 0.82 : this.gramsPerRevolutionCalculate(fineFractionProd,totalRevolutions) ** 0.625;
        let percentPasanteFeed80 = this.percentCalculate(feedSample);
        let percentPasanteProduct80 = this.percentCalculate(productSample);
        let squarerootF80 = Math.sqrt(this.percent80Calculate(percentPasanteFeed80[1]));
        let squarerootP80 = Math.sqrt(this.percent80Calculate(percentPasanteProduct80[1]));
        let workIndex = dividend/(Pi*Gpr*((10/squarerootP80)-(10/squarerootF80)));
        return {workIndex,squarerootF80,squarerootP80};
    }
    predictWorkPerTon(
        millDiameter:number,
        feedSample:samplesType,
        productSample:samplesType,
        fineFractionProd:number,
        totalRevolutions:number,
        diameterMetric:diameterMetricType=this.diameterMetric
        ):number{
        let workIndexObject = this.WorkIndexCalculate(feedSample,productSample,fineFractionProd,totalRevolutions);
        let diameterIncrement = diameterMetric=='meters' ? (8/millDiameter*3.28084)**0.2 : (8/millDiameter)**0.2;
        let totalWork = ((workIndexObject.workIndex*10)/workIndexObject.squarerootP80)-((workIndexObject.workIndex*10)/workIndexObject.squarerootF80);
        return totalWork * diameterIncrement;
    }
    predictWorkPerShortTonWithWorkIndex(
        workIndex:number,
        feedSampleOrF80:samplesType|number,
        productSampleOrP80:samplesType|number,
        millDiameter?:number,
        diameterMetric?:diameterMetricType
        ):number{
        let squarerootF80;
        let squarerootP80;
        if(typeof feedSampleOrF80 != 'number' && typeof productSampleOrP80 != 'number'){
            let percentPasanteFeed80 = this.percentCalculate(feedSampleOrF80);
            let percentPasanteProduct80 = this.percentCalculate(productSampleOrP80);
            squarerootF80 = Math.sqrt(this.percent80Calculate(percentPasanteFeed80[1]));
            squarerootP80 = Math.sqrt(this.percent80Calculate(percentPasanteProduct80[1]));
        }else if (typeof feedSampleOrF80 == 'number' && typeof productSampleOrP80 == 'number'){
            squarerootF80 = Math.sqrt(feedSampleOrF80);
            squarerootP80 = Math.sqrt(productSampleOrP80);
        }else{
            throw new Error("Feed and product samples must be set");
        }
        if (millDiameter!=undefined && diameterMetric==undefined){
            diameterMetric = this.diameterMetric;
            let diameterIncrement = diameterMetric=='meters' ? (8/millDiameter*3.28084)**0.2 : (8/millDiameter)**0.2;
            let totalWork = ((workIndex*10)/squarerootP80)-((workIndex*10)/squarerootF80);
            return totalWork * diameterIncrement;
        }else{
            let totalWork = ((workIndex*10)/squarerootP80)-((workIndex*10)/squarerootF80);
            return totalWork;
        }
    }
}


let samples: samplesType = [59, 298, 373, 156, 230, 91]
let roTapSet: roTapSetType = [12500, 9500, 6300, 4750, 2800, 1700]
let test = new BondExperimentalTest(samples,roTapSet,418);
console.log(test.firstCiclePercents);
console.log(test.firstFeed80);
console.log(test.predictWorkPerShortTonWithWorkIndex(15,410000,240000));
console.log(test.predictWorkPerShortTonWithWorkIndex(15,410000,4000));