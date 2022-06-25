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


let samples_Material_mineria_OpSeparaciónYConcentración_Material_clase312_Set01: samplesType = [59, 298, 373, 156, 230, 91]
let roTapSet_Material_mineria_OpSeparaciónYConcentración_Material_clase312_Set01: roTapSetType = [12500, 9500, 6300, 4750, 2800, 1700]
let test_01 = new BondExperimentalTest(samples_Material_mineria_OpSeparaciónYConcentración_Material_clase312_Set01,roTapSet_Material_mineria_OpSeparaciónYConcentración_Material_clase312_Set01,418);
console.log("test_01:[%retenido]y[%pasante]",test_01.firstCiclePercents);
console.log("test_01:P80Calculado_set01",test_01.firstFeed80);

let samples_Material_mineria_OpSeparaciónYConcentración_Material_clase312_Set02: samplesType = [8, 96, 96, 26, 30, 30, 40]
let roTapSet_Material_mineria_OpSeparaciónYConcentración_Material_clase312_Set02: roTapSetType = [1700, 850, 300, 212, 150, 106, 75]
let percentPass_set02=test_01.percentCalculate(samples_Material_mineria_OpSeparaciónYConcentración_Material_clase312_Set02,88);
console.log("test_01:[%retenido]y[%pasante]",percentPass_set02);
console.log("test_01:P80Calculado_set02",test_01.percent80Calculate(percentPass_set02[1],roTapSet_Material_mineria_OpSeparaciónYConcentración_Material_clase312_Set02));

console.log("test_01:WorkIndex_AyudantiaSet01",test_01.predictWorkPerShortTonWithWorkIndex(15,410000,240000));
console.log("test_01:WorkIndex_AyudantiaSet02",test_01.predictWorkPerShortTonWithWorkIndex(15,410000,4000));

let samples_Material_mineria_OpSeparaciónYConcentración_Material_datosAnalisisGranulométricoDeEjemploSolemne01: samplesType = [810, 2070, 2910, 3780, 2850, 1740, 1770, 1500, 1140, 1140, 1050, 840, 720, 420, 720, 540];
let roTapSet_Material_mineria_OpSeparaciónYConcentración_Material_datosAnalisisGranulométricoDeEjemploSolemne01: roTapSetType = [13200, 9500, 6730, 4760, 3360, 2380, 1680, 1190, 841, 595, 420, 297, 210, 149, 105, 74];
let test_02 = new BondExperimentalTest(samples_Material_mineria_OpSeparaciónYConcentración_Material_datosAnalisisGranulométricoDeEjemploSolemne01,roTapSet_Material_mineria_OpSeparaciónYConcentración_Material_datosAnalisisGranulométricoDeEjemploSolemne01,6000);
console.log("test_02:[%retenido]y[%pasante]",test_02.firstCiclePercents);
console.log("test_02:P80Calculado",test_02.firstFeed80);

console.log("test_02:WorkIndex",test_02.predictWorkPerShortTonWithWorkIndex(15.0406494005555,6957.9,3360));
console.log("test_02:ExcelWorkIndex",test_02.predictWorkPerShortTonWithWorkIndex(15.0406494005555,6730,3360));