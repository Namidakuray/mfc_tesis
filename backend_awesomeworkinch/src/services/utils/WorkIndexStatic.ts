import regression, { DataPoint } from 'regression';
export type samplesType = Array<number>;
export type roTapSetType = Array<number>;
export type percentRetenidoType = Array<number>;
export type percentPasanteType = Array<number>;
export type resultType = 'metric_ton'|'short_ton';

export class InitialWorkIndex {
    public firstSamples: samplesType;
    public roTapSet: roTapSetType;
    public firstCiclePercents: [percentRetenidoType,percentPasanteType];
    public firstFeed80: number;
    public background: number;

    constructor(samples: samplesType, roTapSet: roTapSetType, background: number) {
        this.firstSamples= samples;
        this.roTapSet= roTapSet;
        this.background= background;
        this.firstCiclePercents= this.percentCalculate();
        this.firstFeed80 = this.percent80Calculate();
    }

    percentCalculate(
        sample:samplesType=this.firstSamples,
        background?:number
        ):[percentRetenidoType,percentPasanteType]{
        let totalMass:number;
        if(background!=undefined){
            totalMass = sample.reduce((a,b)=>a+b) + background;
        }else{
            totalMass = sample.reduce((a,b)=>a+b) + this.background;
        }
        if(this.firstSamples.length<=0){
            throw new Error("Samples must have at least 1 point");
        };
        let percentRetenido: percentRetenidoType = sample.map(x=>{return x/totalMass});
        let percentPasante: percentPasanteType = [];
        percentRetenido.forEach((x,i)=>{
            let temp;
                if(i==0){
                    temp = 1-x;
                }else{
                    temp = percentPasante[i-1]-x;
                };
            percentPasante.push(temp);
            }
        );
        return [percentRetenido,percentPasante];
    }
    percent80Calculate(
        percentPasante:percentPasanteType=this.firstCiclePercents[1],
        roTapSet:roTapSetType=this.roTapSet
        ): number {
        let data:[DataPoint]=[[0,0]];
        if(percentPasante.length!==roTapSet.length){
            throw new Error("Samples and ROTapSet must be the same length");
        }else{
            data.shift();
            percentPasante.forEach((y,i)=>{    
                data.push([y,roTapSet[i]]);
            });
        };
        if(data.length<2){
            throw new Error("Data must have at least 2 points");
        }else{
            let regressionResult = regression.polynomial(data, {order: 3});
            let p80 = regressionResult.predict(0.8);
            return p80[1];
        };
    }
    circulatingLoadCalculate(
        coarseFractionProd:number,
        fineFractionProd:number
        ): number {        
        return coarseFractionProd/fineFractionProd;
    }
    //British Chemical Engineering - Freed Bond - ecuation (1a)
    theoricWorkIndexCalculate(
        totalMillWork:number,
        P80:number,
        F80:number
        ): number {
        let squarerootP80 = Math.sqrt(P80);
        let squarerootF80 = Math.sqrt(F80);
        return totalMillWork/((10/squarerootP80)-(10/squarerootF80));
    }
    //British Chemical Engineering - Freed Bond - ecuation (1b)
    theoricProductSizeCalculate(
        workIndex:number,
        totalMillWork:number,
        F80:number
        ): number {
        let squarerootF80 = Math.sqrt(F80);
        let dividend = 10*workIndex*squarerootF80;
        let divisor = (totalMillWork*squarerootF80)+(10*workIndex);
        return (dividend/divisor)**2;
    }
}